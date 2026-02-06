/**
 * Fetch logos for all entities missing them
 */

import { prisma } from '../src/db/client';
import { fetchLogo } from '../src/tools/logos';

async function main() {
  // Get all entities missing logos
  const entities = await prisma.entity.findMany({
    where: {
      logoPath: null,
      url: { not: null },
    },
    select: {
      id: true,
      name: true,
      url: true,
    },
    orderBy: { name: 'asc' },
  });

  console.log(`\nFetching logos for ${entities.length} entities...\n`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < entities.length; i++) {
    const entity = entities[i];
    const progress = `[${i + 1}/${entities.length}]`;

    console.log(`${progress} ${entity.name}...`);

    try {
      const result = await fetchLogo(entity.id);

      if (result.success) {
        console.log(`  ✓ ${result.logoFormat?.toUpperCase() || 'OK'} - ${result.logoPath?.split('/').pop()}`);
        success++;
      } else {
        console.log(`  ✗ ${result.error || 'Unknown error'}`);
        failed++;
      }
    } catch (error) {
      console.log(`  ✗ Exception: ${error instanceof Error ? error.message : String(error)}`);
      failed++;
    }

    // Small delay between requests to be nice to servers
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  console.log(`\n=== Summary ===`);
  console.log(`Success: ${success}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${entities.length}`);

  await prisma.$disconnect();
}

main().catch(console.error);
