/**
 * Migration Script: Convert evidenceScreenshots to evidenceChain
 *
 * This script migrates existing validation screenshots from the legacy
 * evidenceScreenshots array to the new evidenceChain format.
 *
 * Run with: npx ts-node db/migrate-evidence-screenshots.ts
 */

import 'dotenv/config';
import prisma from '../src/db/client';

interface EvidenceChainItem {
  screenshotPath: string;
  description: string;
  capturedAt: string;
  source: 'validation';
}

async function migrateEvidenceScreenshots(): Promise<void> {
  console.log('Starting evidence screenshots migration...\n');

  // Find all assertions with evidenceScreenshots that haven't been migrated
  const assertions = await prisma.assertion.findMany({
    where: {
      NOT: {
        evidenceScreenshots: {
          isEmpty: true,
        },
      },
    },
    include: {
      entity: {
        select: { name: true },
      },
    },
  });

  // Filter to only those without evidenceChain
  const assertionsToMigrate = assertions.filter(a => a.evidenceChain === null);

  console.log(`Found ${assertionsToMigrate.length} assertions with evidenceScreenshots to migrate.\n`);

  let migrated = 0;
  let skipped = 0;

  for (const assertion of assertionsToMigrate) {
    try {
      // Build evidence chain from existing screenshots
      const evidenceChain: EvidenceChainItem[] = assertion.evidenceScreenshots.map(
        (screenshotPath: string) => ({
          screenshotPath,
          description: `Validation screenshot captured during human review. [Migrated from legacy evidenceScreenshots]`,
          capturedAt: new Date().toISOString(),
          source: 'validation' as const,
        })
      );

      // Use the first screenshot as the primary evidence
      const primaryScreenshot = assertion.evidenceScreenshots[0] || null;

      // Update the assertion
      await prisma.assertion.update({
        where: { id: assertion.id },
        data: {
          evidenceChain: evidenceChain as unknown as any,
          evidenceScreenshotPath: primaryScreenshot,
          evidenceDescription: evidenceChain.length > 0
            ? `${evidenceChain.length} validation screenshot(s) captured during human review.`
            : null,
        },
      });

      console.log(
        `  ✓ Migrated: "${assertion.claim.substring(0, 50)}..." (${assertion.entity.name})`
      );
      console.log(`    - ${assertion.evidenceScreenshots.length} screenshot(s) → evidenceChain`);
      migrated++;
    } catch (error) {
      console.error(`  ✗ Failed: "${assertion.claim.substring(0, 50)}..."`);
      console.error(`    Error: ${error}`);
      skipped++;
    }
  }

  console.log('\n--- Migration Summary ---');
  console.log(`Total assertions processed: ${assertionsToMigrate.length}`);
  console.log(`Successfully migrated: ${migrated}`);
  console.log(`Skipped/Failed: ${skipped}`);
}

async function main(): Promise<void> {
  try {
    await migrateEvidenceScreenshots();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
