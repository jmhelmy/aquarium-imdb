export const dynamic = "force-dynamic";

import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";

export default async function FishDetailPage({ params }: { params: { id: string } }) {
  const fishId = Number(params.id);
  const fish = await prisma.fish.findUnique({ where: { id: fishId } });

  if (!fish) return notFound();

  return (
    <main className="min-h-screen bg-blue-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">{fish.name}</h1>
        <p className="text-xl text-gray-800 mb-4 italic">{fish.scientificName}</p>

        {fish.image && (
          <img
            src={fish.image}
            alt={fish.name}
            className="w-full h-auto mb-6 object-cover rounded shadow"
          />
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
          {fish.type && <p><strong>Type:</strong> {fish.type}</p>}
          {fish.size && <p><strong>Size:</strong> {fish.size}</p>}
          {fish.tankSize && <p><strong>Tank Size:</strong> {fish.tankSize}</p>}
          {fish.temperature && <p><strong>Temperature:</strong> {fish.temperature}</p>}
          {fish.ph && <p><strong>pH:</strong> {fish.ph}</p>}
          {fish.waterHardness && <p><strong>Water Hardness:</strong> {fish.waterHardness}</p>}
          {fish.swimLevel && <p><strong>Swim Level:</strong> {fish.swimLevel}</p>}
          {fish.aggression && <p><strong>Aggression:</strong> {fish.aggression}</p>}
          {fish.behavior && <p><strong>Behavior:</strong> {fish.behavior}</p>}
          {fish.schooling && <p><strong>Schooling:</strong> {fish.schooling}</p>}
          {fish.popularity && <p><strong>Popularity:</strong> {fish.popularity}</p>}
          {fish.difficulty && <p><strong>Difficulty:</strong> {fish.difficulty}</p>}
          {fish.lighting && <p><strong>Lighting:</strong> {fish.lighting}</p>}
          {fish.food && <p><strong>Food:</strong> {fish.food}</p>}
          {fish.compatibility && <p><strong>Compatibility:</strong> {fish.compatibility}</p>}
          {fish.tankMates && <p><strong>Tank Mates:</strong> {fish.tankMates}</p>}
          {fish.breeding && <p><strong>Breeding:</strong> {fish.breeding}</p>}
          {fish.lifespan && <p><strong>Lifespan:</strong> {fish.lifespan}</p>}
          {fish.origin && <p><strong>Origin:</strong> {fish.origin}</p>}
          {fish.colorVariants && <p><strong>Color Variants:</strong> {fish.colorVariants}</p>}
          {fish.careNotes && <p><strong>Care Notes:</strong> {fish.careNotes}</p>}
          {fish.notes && <p><strong>Notes:</strong> {fish.notes}</p>}
        </div>
      </div>
    </main>
  );
}
