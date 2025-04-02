import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  const { data } = await req.json();

  try {
    for (const item of data) {
      await prisma.fish.create({
        data: {
          name: item.name,
          scientificName: item.scientificName,
          featuredImage: item.featuredImage || null,
          type: item.type || null,
          size: item.size || null,
          minimumTankSize: item.minimumTankSize || null,
          temperature: item.temperature || null,
          ph: item.ph || null,
          waterHardness: item.waterHardness || null,
          swimLevel: item.swimLevel || null,
          aggression: item.aggression || null,
          behavior: item.behavior || null,
          schooling: item.schooling || null,
          popularity: item.popularity || null,
          difficulty: item.difficulty || null,
          lighting: item.lighting || null,
          food: item.food || null,
          compatibility: item.compatibility || null,
          tankMates: item.tankMates || null,
          breeding: item.breeding || null,
          lifespan: item.lifespan || null,
          origin: item.origin || null,
          colorVariants: item.colorVariants || null,
          careNotes: item.careNotes || null,
          notes: item.notes || null,
          slug: item.slug || null,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error importing fish:', error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
