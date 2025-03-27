export const dynamic = "force-dynamic";

import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";

export default async function FishDetailPage({ params }: { params: { id: string } }) {
  const fishId = Number(params.id);
  const fish = await prisma.fish.findUnique({ where: { id: fishId } });

  if (!fish) return notFound();

  const fieldList = [
    { label: "Type", value: fish.type },
    { label: "Size", value: fish.size },
    { label: "Tank Size", value: fish.tankSize },
    { label: "Temperature", value: fish.temperature },
    { label: "pH", value: fish.ph },
    { label: "Water Hardness", value: fish.waterHardness },
    { label: "Swim Level", value: fish.swimLevel },
    { label: "Aggression", value: fish.aggression },
    { label: "Behavior", value: fish.behavior },
    { label: "Schooling", value: fish.schooling },
    { label: "Popularity", value: fish.popularity },
    { label: "Difficulty", value: fish.difficulty },
    { label: "Lighting", value: fish.lighting },
    { label: "Food", value: fish.food },
    { label: "Compatibility", value: fish.compatibility },
    { label: "Tank Mates", value: fish.tankMates },
    { label: "Breeding", value: fish.breeding },
    { label: "Lifespan", value: fish.lifespan },
    { label: "Origin", value: fish.origin },
    { label: "Color Variants", value: fish.colorVariants },
    { label: "Care Notes", value: fish.careNotes },
    { label: "Notes", value: fish.notes },
  ];

  return (
    <main className="min-h-screen bg-blue-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">{fish.name}</h1>
        <p className="text-xl text-gray-800 mb-4">{fish.scientificName}</p>

        {fish.image && (
          <img
            src={fish.image}
            alt={fish.name}
            className="w-full h-auto mb-4 object-cover rounded"
          />
        )}

        {fieldList.map(
          (field) =>
            field.value && (
              <p key={field.label} className="mb-2 text-lg text-gray-700">
                <strong>{field.label}:</strong> {field.value}
              </p>
            )
        )}
      </div>
    </main>
  );
}
