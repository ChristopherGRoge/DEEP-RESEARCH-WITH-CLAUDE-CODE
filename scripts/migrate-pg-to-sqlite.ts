#!/usr/bin/env npx ts-node --transpile-only
/**
 * PostgreSQL to SQLite Migration Script
 *
 * Reads a PostgreSQL backup (.sql or .sql.gz) and imports data into SQLite
 *
 * Usage: npx ts-node --transpile-only scripts/migrate-pg-to-sqlite.ts <backup-file>
 */

import { createReadStream } from 'fs';
import { createGunzip } from 'zlib';
import * as readline from 'readline';
import { prisma } from '../src/db/client';

// Table name mapping from PostgreSQL to Prisma model names
const TABLE_TO_MODEL: Record<string, string> = {
  'research_projects': 'researchProject',
  'entities': 'entity',
  'assertions': 'assertion',
  'reasoning': 'reasoning',
  'sources': 'source',
  'assertion_sources': 'assertionSource',
  'research_logs': 'researchLog',
  'screenshots': 'screenshot',
  'extractions': 'extraction',
  'research_sessions': 'researchSession',
  'research_tasks': 'researchTask',
  'discovery_sources': 'discoverySource',
  'raw_discoveries': 'rawDiscovery',
  'discovery_crawls': 'discoveryCrawl',
  'discovery_trends': 'discoveryTrend',
  'discovery_categories': 'discoveryCategory',
  'research_domains': 'researchDomain',
};

// Fields that should be parsed as JSON
const JSON_FIELDS = new Set([
  'details', 'data', 'rawQuotes', 'config', 'overallProgress', 'progress',
  'results', 'selectors', 'checkpoint', 'buzzComponents', 'confidenceFactors',
  'validationHistory', 'validationNotes', 'evidenceChain', 'criticalityFactors',
  'evaluationDimensions', 'evidenceScreenshots', 'assertionIds', 'categories',
  'tags', 'extractedLinks', 'keywords', 'sourceIds', 'entityIds',
  'exemplarEntities', 'antiExemplars', 'entityTypes', 'knownLeaders', 'relevantTopics'
]);

// Fields that are arrays of strings (now stored as JSON in SQLite)
const ARRAY_FIELDS = new Set([
  'evidenceScreenshots', 'assertionIds', 'categories', 'tags', 'extractedLinks',
  'keywords', 'sourceIds', 'entityIds', 'exemplarEntities', 'antiExemplars',
  'entityTypes', 'knownLeaders', 'relevantTopics'
]);

interface TableData {
  tableName: string;
  columns: string[];
  rows: any[];
}

async function parseBackup(filePath: string): Promise<Map<string, TableData>> {
  const tables = new Map<string, TableData>();

  let inputStream = createReadStream(filePath);
  if (filePath.endsWith('.gz')) {
    inputStream = inputStream.pipe(createGunzip()) as any;
  }

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity
  });

  let currentTable: TableData | null = null;
  let inCopyBlock = false;

  for await (const line of rl) {
    // Detect COPY statement
    const copyMatch = line.match(/^COPY public\.(\w+) \(([^)]+)\) FROM stdin;$/);
    if (copyMatch) {
      const tableName = copyMatch[1];
      const columns = copyMatch[2].split(', ').map(c => c.replace(/"/g, ''));

      currentTable = { tableName, columns, rows: [] };
      inCopyBlock = true;
      continue;
    }

    // End of COPY block
    if (line === '\\.' && inCopyBlock) {
      if (currentTable) {
        tables.set(currentTable.tableName, currentTable);
        console.log(`  Parsed ${currentTable.tableName}: ${currentTable.rows.length} rows`);
      }
      currentTable = null;
      inCopyBlock = false;
      continue;
    }

    // Parse data row
    if (inCopyBlock && currentTable) {
      const values = line.split('\t');
      const row: Record<string, any> = {};

      for (let i = 0; i < currentTable.columns.length; i++) {
        const col = currentTable.columns[i];
        let val = values[i];

        // Handle PostgreSQL NULL
        if (val === '\\N') {
          row[col] = null;
        }
        // Handle JSON fields
        else if (JSON_FIELDS.has(col) && val && val !== '\\N') {
          try {
            row[col] = JSON.parse(val);
          } catch {
            row[col] = val;
          }
        }
        // Handle PostgreSQL array syntax {a,b,c} -> JSON array
        else if (ARRAY_FIELDS.has(col) && val && val.startsWith('{') && val.endsWith('}')) {
          const arrayContent = val.slice(1, -1);
          if (arrayContent === '') {
            row[col] = [];
          } else {
            // Parse PostgreSQL array format
            row[col] = arrayContent.split(',').map(s => s.replace(/^"|"$/g, ''));
          }
        }
        // Handle boolean
        else if (val === 't') {
          row[col] = true;
        }
        else if (val === 'f') {
          row[col] = false;
        }
        // Handle numbers
        else if (/^-?\d+$/.test(val)) {
          row[col] = parseInt(val, 10);
        }
        else if (/^-?\d+\.\d+$/.test(val)) {
          row[col] = parseFloat(val);
        }
        else {
          row[col] = val;
        }
      }

      currentTable.rows.push(row);
    }
  }

  return tables;
}

async function importToSQLite(tables: Map<string, TableData>) {
  // Import order matters due to foreign keys
  const importOrder = [
    'research_projects',
    'discovery_categories',
    'research_domains',
    'sources',           // Sources before assertion_sources
    'screenshots',       // Screenshots before extractions
    'entities',
    'assertions',
    'reasoning',
    'assertion_sources',
    'extractions',
    'research_logs',
    'research_sessions',
    'research_tasks',
    'discovery_sources',
    'raw_discoveries',
    'discovery_crawls',
    'discovery_trends',
  ];

  // Track imported IDs to validate foreign keys
  const importedIds: Record<string, Set<string>> = {};

  for (const tableName of importOrder) {
    const tableData = tables.get(tableName);
    if (!tableData || tableData.rows.length === 0) {
      console.log(`  Skipping ${tableName}: no data`);
      importedIds[tableName] = new Set();
      continue;
    }

    const modelName = TABLE_TO_MODEL[tableName];
    if (!modelName) {
      console.log(`  Skipping ${tableName}: no model mapping`);
      continue;
    }

    console.log(`  Importing ${tableName} (${tableData.rows.length} rows)...`);

    const model = (prisma as any)[modelName];
    if (!model) {
      console.log(`    Warning: Model ${modelName} not found`);
      continue;
    }

    let imported = 0;
    let skipped = 0;
    importedIds[tableName] = new Set();

    for (const row of tableData.rows) {
      try {
        // Convert date strings to Date objects
        for (const key of Object.keys(row)) {
          if (key.endsWith('At') && row[key] && typeof row[key] === 'string') {
            row[key] = new Date(row[key]);
          }
        }

        // Skip if foreign key references don't exist
        if (tableName === 'entities') {
          // categoryId is optional, clear if not imported
          if (row.categoryId && !importedIds['discovery_categories']?.has(row.categoryId)) {
            row.categoryId = null;
          }
          // domainId is optional, clear if not imported
          if (row.domainId && !importedIds['research_domains']?.has(row.domainId)) {
            row.domainId = null;
          }
        }

        if (tableName === 'extractions') {
          // Check source and screenshot exist
          if (row.sourceId && !importedIds['sources']?.has(row.sourceId)) {
            skipped++;
            continue;
          }
          if (row.screenshotId && !importedIds['screenshots']?.has(row.screenshotId)) {
            row.screenshotId = null;
          }
        }

        if (tableName === 'assertion_sources') {
          // Check both foreign keys exist
          if (!importedIds['assertions']?.has(row.assertionId) ||
              !importedIds['sources']?.has(row.sourceId)) {
            skipped++;
            continue;
          }
        }

        // Use create instead of upsert to avoid issues
        await model.create({ data: row });
        imported++;
        importedIds[tableName].add(row.id);
      } catch (error: any) {
        // Handle unique constraint violations by skipping
        if (error.code === 'P2002') {
          skipped++;
          importedIds[tableName].add(row.id);
        } else if (error.message?.includes('Foreign key constraint')) {
          skipped++;
        } else {
          console.log(`    Error importing row ${row.id}: ${error.message?.slice(0, 100)}`);
          skipped++;
        }
      }
    }

    console.log(`    Imported: ${imported}, Skipped: ${skipped}`);
  }
}

async function main() {
  const backupFile = process.argv[2];

  if (!backupFile) {
    console.log('Usage: npx ts-node --transpile-only scripts/migrate-pg-to-sqlite.ts <backup-file>');
    console.log('');
    console.log('Available backups:');
    const { readdirSync, statSync } = await import('fs');
    const backups = readdirSync('backups')
      .filter(f => f.endsWith('.sql') || f.endsWith('.sql.gz'))
      .map(f => ({ name: f, size: statSync(`backups/${f}`).size }))
      .filter(f => f.size > 100)
      .sort((a, b) => b.name.localeCompare(a.name));

    for (const backup of backups) {
      console.log(`  backups/${backup.name} (${Math.round(backup.size / 1024)}KB)`);
    }
    process.exit(1);
  }

  console.log('PostgreSQL to SQLite Migration');
  console.log('==============================');
  console.log('');
  console.log(`Backup file: ${backupFile}`);
  console.log('');

  console.log('Step 1: Parsing PostgreSQL backup...');
  const tables = await parseBackup(backupFile);
  console.log(`  Found ${tables.size} tables with data`);
  console.log('');

  console.log('Step 2: Importing to SQLite...');
  await importToSQLite(tables);
  console.log('');

  console.log('Migration complete!');

  // Show summary
  const projectCount = await prisma.researchProject.count();
  const entityCount = await prisma.entity.count();
  const assertionCount = await prisma.assertion.count();

  console.log('');
  console.log('Database summary:');
  console.log(`  Projects: ${projectCount}`);
  console.log(`  Entities: ${entityCount}`);
  console.log(`  Assertions: ${assertionCount}`);

  await prisma.$disconnect();
}

main().catch(console.error);
