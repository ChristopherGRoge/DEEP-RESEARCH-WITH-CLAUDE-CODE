/**
 * Cleanup orphaned screenshot files
 * Removes files not referenced by any assertion or screenshot record
 * Also removes content-duplicate files (same MD5 hash)
 */

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { prisma } from '../src/db/client';

const SCREENSHOTS_DIR = path.resolve('screenshots');

interface FileInfo {
  path: string;
  relativePath: string;
  size: number;
  hash: string;
}

async function getReferencedPaths(): Promise<Set<string>> {
  const referenced = new Set<string>();

  // Get paths from assertions
  const assertions = await prisma.assertion.findMany({
    where: { evidenceScreenshotPath: { not: null } },
    select: { evidenceScreenshotPath: true }
  });

  for (const a of assertions) {
    if (a.evidenceScreenshotPath) {
      referenced.add(a.evidenceScreenshotPath);
      // Also add without leading path variations
      referenced.add(path.basename(a.evidenceScreenshotPath));
    }
  }

  // Get paths from screenshot table
  const screenshots = await prisma.screenshot.findMany({
    select: { filePath: true }
  });

  for (const s of screenshots) {
    if (s.filePath) {
      referenced.add(s.filePath);
      referenced.add(path.basename(s.filePath));
    }
  }

  // Get paths from extractions (screenshotId links to screenshot table, handled above)
  // Also check extraction raw data for screenshot paths
  const extractions = await prisma.extraction.findMany({
    select: { screenshotId: true }
  });

  return referenced;
}

function getAllScreenshotFiles(): FileInfo[] {
  const files: FileInfo[] = [];

  function walkDir(dir: string) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (entry.isFile() && /\.(png|jpg|jpeg|webp|gif)$/i.test(entry.name)) {
        const stats = fs.statSync(fullPath);
        const content = fs.readFileSync(fullPath);
        const hash = crypto.createHash('md5').update(content).digest('hex');

        files.push({
          path: fullPath,
          relativePath: path.relative(process.cwd(), fullPath),
          size: stats.size,
          hash
        });
      }
    }
  }

  walkDir(SCREENSHOTS_DIR);
  return files;
}

function findDuplicateFiles(files: FileInfo[]): Map<string, FileInfo[]> {
  const byHash = new Map<string, FileInfo[]>();

  for (const file of files) {
    if (!byHash.has(file.hash)) {
      byHash.set(file.hash, []);
    }
    byHash.get(file.hash)!.push(file);
  }

  // Return only groups with duplicates
  const duplicates = new Map<string, FileInfo[]>();
  for (const [hash, group] of byHash) {
    if (group.length > 1) {
      duplicates.set(hash, group);
    }
  }

  return duplicates;
}

async function main() {
  const dryRun = process.argv.includes('--dry-run') || !process.argv.includes('--execute');

  console.log(`\n=== Screenshot Cleanup ${dryRun ? '(DRY RUN)' : '(EXECUTING)'} ===\n`);

  // Get all files on disk
  console.log('Scanning screenshot files...');
  const allFiles = getAllScreenshotFiles();
  console.log(`Found ${allFiles.length} screenshot files on disk`);

  // Get referenced paths from database
  console.log('Checking database references...');
  const referenced = await getReferencedPaths();
  console.log(`Found ${referenced.size} referenced paths in database`);

  // Find orphaned files (not referenced anywhere)
  const orphaned = allFiles.filter(f => {
    // Check various path formats
    const checks = [
      f.path,
      f.relativePath,
      path.basename(f.path),
      f.relativePath.replace(/^screenshots\//, ''),
    ];
    return !checks.some(c => referenced.has(c));
  });

  console.log(`\nOrphaned files (not referenced): ${orphaned.length}`);
  const orphanedSize = orphaned.reduce((sum, f) => sum + f.size, 0);
  console.log(`Orphaned disk usage: ${(orphanedSize / 1024 / 1024).toFixed(1)} MB`);

  // Find duplicate content files
  const duplicates = findDuplicateFiles(allFiles);
  let duplicateCount = 0;
  let duplicateSize = 0;

  for (const [hash, group] of duplicates) {
    // Keep the first file, count the rest as duplicates
    for (let i = 1; i < group.length; i++) {
      duplicateCount++;
      duplicateSize += group[i].size;
    }
  }

  console.log(`\nDuplicate content files: ${duplicateCount}`);
  console.log(`Duplicate disk usage: ${(duplicateSize / 1024 / 1024).toFixed(1)} MB`);

  // Show examples
  if (orphaned.length > 0) {
    console.log(`\nExample orphaned files:`);
    for (const f of orphaned.slice(0, 5)) {
      console.log(`  - ${f.relativePath} (${(f.size / 1024).toFixed(0)} KB)`);
    }
    if (orphaned.length > 5) {
      console.log(`  ... and ${orphaned.length - 5} more`);
    }
  }

  if (duplicates.size > 0) {
    console.log(`\nExample duplicate groups:`);
    let shown = 0;
    for (const [hash, group] of duplicates) {
      if (shown >= 3) break;
      console.log(`  Hash ${hash.substring(0, 8)}...:`);
      for (const f of group) {
        console.log(`    - ${path.basename(f.relativePath)}`);
      }
      shown++;
    }
  }

  // Calculate total cleanup
  // For duplicates, we keep the first file (preferring referenced files)
  const toDelete: FileInfo[] = [...orphaned];

  for (const [hash, group] of duplicates) {
    // Sort to prefer keeping referenced files
    group.sort((a, b) => {
      const aReferenced = [a.path, a.relativePath, path.basename(a.path)]
        .some(p => referenced.has(p));
      const bReferenced = [b.path, b.relativePath, path.basename(b.path)]
        .some(p => referenced.has(p));
      if (aReferenced && !bReferenced) return -1;
      if (!aReferenced && bReferenced) return 1;
      return 0;
    });

    // Delete all but the first (kept) file, but only if not already in orphaned list
    for (let i = 1; i < group.length; i++) {
      if (!orphaned.some(o => o.path === group[i].path)) {
        toDelete.push(group[i]);
      }
    }
  }

  // Dedupe the toDelete list
  const uniqueToDelete = Array.from(new Map(toDelete.map(f => [f.path, f])).values());

  const totalSize = uniqueToDelete.reduce((sum, f) => sum + f.size, 0);

  console.log(`\n=== Summary ===`);
  console.log(`Files to delete: ${uniqueToDelete.length}`);
  console.log(`Space to recover: ${(totalSize / 1024 / 1024).toFixed(1)} MB`);

  if (!dryRun && uniqueToDelete.length > 0) {
    console.log(`\nDeleting files...`);
    let deleted = 0;
    for (const file of uniqueToDelete) {
      try {
        fs.unlinkSync(file.path);
        deleted++;
      } catch (err) {
        console.error(`  Failed to delete ${file.relativePath}: ${err}`);
      }
    }
    console.log(`Deleted ${deleted} files.`);

    // Clean up empty directories
    console.log(`Cleaning up empty directories...`);
    const subdirs = fs.readdirSync(SCREENSHOTS_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => path.join(SCREENSHOTS_DIR, d.name));

    for (const dir of subdirs) {
      try {
        const contents = fs.readdirSync(dir);
        if (contents.length === 0) {
          fs.rmdirSync(dir);
          console.log(`  Removed empty directory: ${path.basename(dir)}`);
        }
      } catch (err) {
        // Ignore errors
      }
    }
  } else if (dryRun) {
    console.log(`\nRun with --execute to actually delete files.`);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
