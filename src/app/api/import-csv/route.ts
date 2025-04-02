// src/app/api/import-csv/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ensure you have a prisma client set up

// Define an interface for a CSV row matching your expected fields.
interface CSVRow {
  name: string;
  scientificName: string;
  featuredImage?: string;
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
  slug?: string;
}

export async function POST(request: Request) {
  try {
    // Parse the JSON body, expecting an object with a 'data' property that is an array of CSVRow.
    const { data } = await request.json() as { data: CSVRow[] };

    console.log("Received CSV data:", data);

    // Map CSV rows to the Prisma model format.
    const insertData = data.map((row: CSVRow) => ({
      name: row.name,
      scientificName: row.scientificName,
      featuredImage: row.featuredImage || null,
      type: row.type || null,
      size: row.size || null,
      tankSize: row.tankSize || null,
      temperature: row.temperature || null,
      ph: row.ph || null,
      waterHardness: row.waterHardness || null,
      swimLevel: row.swimLevel || null,
      aggression: row.aggression || null,
      behavior: row.behavior || null,
      schooling: row.schooling || null,
      popularity: row.popularity || null,
      difficulty: row.difficulty || null,
      lighting: row.lighting || null,
      food: row.food || null,
      compatibility: row.compatibility || null,
      tankMates: row.tankMates || null,
      breeding: row.breeding || null,
      lifespan: row.lifespan || null,
      origin: row.origin || null,
      colorVariants: row.colorVariants || null,
      careNotes: row.careNotes || null,
      notes: row.notes || null,
      slug: row.slug || null,
    }));

    console.log("Inserting data:", insertData);

    // Insert the data using Prisma's bulk insert method.
    const result = await prisma.fish.createMany({
      data: insertData,
      skipDuplicates: true,
    });

    console.log("Insert result:", result);

    return NextResponse.json({ message: 'CSV data imported successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error importing CSV data:', error);
    return NextResponse.json({ error: 'Failed to import CSV data' }, { status: 500 });
  }
}
