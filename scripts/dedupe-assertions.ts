/**
 * Deduplicate assertions - removes exact duplicate claims for the same entity
 * Keeps the oldest assertion (first created)
 */

import { prisma } from '../src/db/client';

interface DuplicateGroup {
  entityId: string;
  entityName: string;
  claim: string;
  ids: string[];
  createdAts: Date[];
}

async function findDuplicateAssertions(): Promise<DuplicateGroup[]> {
  // Find all assertions grouped by entity + claim
  const assertions = await prisma.assertion.findMany({
    select: {
      id: true,
      entityId: true,
      claim: true,
      createdAt: true,
      entity: {
        select: { name: true }
      }
    },
    orderBy: { createdAt: 'asc' }
  });

  // Group by entity + claim
  const groups = new Map<string, DuplicateGroup>();

  for (const a of assertions) {
    const key = `${a.entityId}::${a.claim}`;
    if (!groups.has(key)) {
      groups.set(key, {
        entityId: a.entityId,
        entityName: a.entity.name,
        claim: a.claim,
        ids: [],
        createdAts: []
      });
    }
    const group = groups.get(key)!;
    group.ids.push(a.id);
    group.createdAts.push(a.createdAt);
  }

  // Return only groups with duplicates (more than 1)
  return Array.from(groups.values()).filter(g => g.ids.length > 1);
}

async function deleteDuplicates(duplicates: DuplicateGroup[], dryRun: boolean = true): Promise<{
  totalGroups: number;
  totalDeleted: number;
  entitiesAffected: Set<string>;
}> {
  const entitiesAffected = new Set<string>();
  let totalDeleted = 0;

  for (const group of duplicates) {
    // Keep the first (oldest) assertion, delete the rest
    const toDelete = group.ids.slice(1);
    entitiesAffected.add(group.entityName);

    if (!dryRun) {
      // Delete related records first (validations, reasoning, assertion sources)
      for (const id of toDelete) {
        await prisma.validationResult.deleteMany({ where: { assertionId: id } });
        await prisma.reasoning.deleteMany({ where: { assertionId: id } });
        await prisma.assertionSource.deleteMany({ where: { assertionId: id } });
        await prisma.assertion.delete({ where: { id } });
      }
    }

    totalDeleted += toDelete.length;
  }

  return {
    totalGroups: duplicates.length,
    totalDeleted,
    entitiesAffected
  };
}

async function main() {
  const dryRun = process.argv.includes('--dry-run') || !process.argv.includes('--execute');

  console.log(`\n=== Assertion Deduplication ${dryRun ? '(DRY RUN)' : '(EXECUTING)'} ===\n`);

  const duplicates = await findDuplicateAssertions();

  if (duplicates.length === 0) {
    console.log('No duplicate assertions found.');
    await prisma.$disconnect();
    return;
  }

  console.log(`Found ${duplicates.length} duplicate groups:\n`);

  // Show some examples
  const examples = duplicates.slice(0, 10);
  for (const g of examples) {
    console.log(`- ${g.entityName}: "${g.claim.substring(0, 60)}${g.claim.length > 60 ? '...' : ''}" (${g.ids.length}x)`);
  }
  if (duplicates.length > 10) {
    console.log(`  ... and ${duplicates.length - 10} more groups`);
  }

  const result = await deleteDuplicates(duplicates, dryRun);

  console.log(`\n=== Summary ===`);
  console.log(`Duplicate groups: ${result.totalGroups}`);
  console.log(`Assertions to delete: ${result.totalDeleted}`);
  console.log(`Entities affected: ${result.entitiesAffected.size}`);

  if (dryRun) {
    console.log(`\nRun with --execute to actually delete duplicates.`);
  } else {
    console.log(`\nDeleted ${result.totalDeleted} duplicate assertions.`);
  }

  await prisma.$disconnect();
}

main().catch(console.error);
