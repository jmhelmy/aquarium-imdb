import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

const prisma = new PrismaClient();

async function main() {
  const results: any[] = [];

  const filePath = path.join(__dirname, '..', 'freshwater_fish_with_corydoras_and_glofish.csv');

  return new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        for (const fish of results) {
          await prisma.fish.create({
            data: {
              name: fish.name,
              scientificName: fish.scientificName,
              image: fish.image,
              type: fish.type,
              size: fish.size,
              tankSize: fish.tankSize,
              temperature: fish.temperature,
              ph: fish.ph,
              waterHardness: fish.waterHardness,
              swimLevel: fish.swimLevel,
              aggression: fish.aggression,
              behavior: fish.behavior,
              schooling: fish.schooling,
              popularity: fish.popularity,
              difficulty: fish.difficulty,
              lighting: fish.lighting,
              food: fish.food,
              compatibility: fish.compatibility,
              tankMates: fish.tankMates,
              breeding: fish.breeding,
              lifespan: fish.lifespan,
              origin: fish.origin,
              colorVariants: fish.colorVariants,
              careNotes: fish.careNotes,
              notes: fish.notes,
            },
          });
        }
        resolve();
      })
      .on('error', reject);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
