// src/app/api/import-csv/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Ensure you have a prisma client set up

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const { data } = await request.json();
    console.log("Received CSV data:", data);

    // Map CSV rows to the Prisma model format
    const insertData = data.map((row: any) => ({
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

    // Insert into the database using bulk insert
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
