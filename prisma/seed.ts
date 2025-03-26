import fs from "fs";
import path from "path";
import csv from "csv-parser";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // 1. Define the shape of your fish data (matching your Prisma model columns)
  const fishList: {
    name: string;
    scientificName: string;
    image?: string;
    type?: string;
    size?: string;
    tankSize?: string;
    temperature?: string;
    ph?: string;
    waterHardness?: string;
    swimLevel?: string;
    aggression?: string;
    behavior?: string;
    schooling?: string;
    popularity?: string;
    difficulty?: string;
    lighting?: string;
    food?: string;
    compatibility?: string;
    tankMates?: string;
    breeding?: string;
    lifespan?: string;
    origin?: string;
    colorVariants?: string;
    careNotes?: string;
    notes?: string;
  }[] = [];

  // 2. Point to your CSV file name here
  //    Make sure this CSV is located in the root of your project (one level up from prisma/)
  const filePath = path.join(__dirname, "../freshwater_fish_with_corydoras_and_glofish.csv");

  // 3. Parse the CSV
  await new Promise<void>((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // Map each CSV column to the fields in your Prisma schema
        fishList.push({
          name: row.name,
          scientificName: row.scientificName,
          image: row.image || undefined,
          type: row.type || undefined,
          size: row.size || undefined,
          tankSize: row.tankSize || undefined,
          temperature: row.temperature || undefined,
          ph: row.ph || undefined,
          waterHardness: row.waterHardness || undefined,
          swimLevel: row.swimLevel || undefined,
          aggression: row.aggression || undefined,
          behavior: row.behavior || undefined,
          schooling: row.schooling || undefined,
          popularity: row.popularity || undefined,
          difficulty: row.difficulty || undefined,
          lighting: row.lighting || undefined,
          food: row.food || undefined,
          compatibility: row.compatibility || undefined,
          tankMates: row.tankMates || undefined,
          breeding: row.breeding || undefined,
          lifespan: row.lifespan || undefined,
          origin: row.origin || undefined,
          colorVariants: row.colorVariants || undefined,
          careNotes: row.careNotes || undefined,
          notes: row.notes || undefined,
        });
      })
      .on("end", resolve)
      .on("error", reject);
  });

  // 4. Insert into your DB
  console.log(`Importing ${fishList.length} fish...`);
  await prisma.fish.createMany({
    data: fishList,
  });

  console.log("Done seeding!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
