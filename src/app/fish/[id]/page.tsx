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
            className="w-full h-auto mb-4 object-cover rounded"
          />
        )}

        {/* Render all additional fields if they exist */}
        {fish.type && <p className="mb-2 text-gray-700"><strong>Type:</strong> {fish.type}</p>}
        {fish.size && <p className="mb-2 text-gray-700"><strong>Size:</strong> {fish.size}</p>}
        {fish.tankSize && <p className="mb-2 text-gray-700"><strong>Tank Size:</strong> {fish.tankSize}</p>}
        {fish.temperature && <p className="mb-2 text-gray-700"><strong>Temperature:</strong> {fish.temperature}</p>}
        {fish.ph && <p className="mb-2 text-gray-700"><strong>pH:</strong> {fish.ph}</p>}
        {fish.waterHardness && <p className="mb-2 text-gray-700"><strong>Water Hardness:</strong> {fish.waterHardness}</p>}
        {fish.swimLevel && <p className="mb-2 text-gray-700"><strong>Swim Level:</strong> {fish.swimLevel}</p>}
        {fish.aggression && <p className="mb-2 text-gray-700"><strong>Aggression:</strong> {fish.aggression}</p>}
        {fish.behavior && <p className="mb-2 text-gray-700"><strong>Behavior:</strong> {fish.behavior}</p>}
        {fish.schooling && <p className="mb-2 text-gray-700"><strong>Schooling:</strong> {fish.schooling}</p>}
        {fish.popularity && <p className="mb-2 text-gray-700"><strong>Popularity:</strong> {fish.popularity}</p>}
        {fish.difficulty && <p className="mb-2 text-gray-700"><strong>Difficulty:</strong> {fish.difficulty}</p>}
        {fish.lighting && <p className="mb-2 text-gray-700"><strong>Lighting:</strong> {fish.lighting}</p>}
        {fish.food && <p className="mb-2 text-gray-700"><strong>Food:</strong> {fish.food}</p>}
        {fish.compatibility && <p className="mb-2 text-gray-700"><strong>Compatibility:</strong> {fish.compatibility}</p>}
        {fish.tankMates && <p className="mb-2 text-gray-700"><strong>Tank Mates:</strong> {fish.tankMates}</p>}
        {fish.breeding && <p className="mb-2 text-gray-700"><strong>Breeding:</strong> {fish.breeding}</p>}
        {fish.lifespan && <p className="mb-2 text-gray-700"><strong>Lifespan:</strong> {fish.lifespan}</p>}
        {fish.origin && <p className="mb-2 text-gray-700"><strong>Origin:</strong> {fish.origin}</p>}
        {fish.colorVariants && <p className="mb-2 text-gray-700"><strong>Color Variants:</strong> {fish.colorVariants}</p>}
        {fish.careNotes && <p className="mb-2 text-gray-700"><strong>Care Notes:</strong> {fish.careNotes}</p>}
        {fish.notes && <p className="mb-2 text-gray-700"><strong>Notes:</strong> {fish.notes}</p>}
      </div>
    </main>
  );
}
