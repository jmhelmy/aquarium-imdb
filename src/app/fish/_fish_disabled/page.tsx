export const dynamic = "force-dynamic";

import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const fishId = Number(params.id);
  const fish = await prisma.fish.findUnique({ where: { id: fishId } });

  if (!fish) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-blue-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">{fish.name}</h1>
        <p className="text-xl text-gray-800 mb-4">{fish.scientificName}</p>

        {fish.image && (
          <img
            src={fish.image}
            alt={fish.name}
            className="w-full h-auto mb-6 rounded-lg object-cover"
          />
        )}

        {fish.type && <p className="mb-2 text-lg text-gray-700">Type: {fish.type}</p>}
        {fish.size && <p className="mb-2 text-lg text-gray-700">Size: {fish.size}</p>}
        {fish.tankSize && <p className="mb-2 text-lg text-gray-700">Tank Size: {fish.tankSize}</p>}
        {fish.temperature && <p className="mb-2 text-lg text-gray-700">Temperature: {fish.temperature}</p>}
        {fish.ph && <p className="mb-2 text-lg text-gray-700">pH: {fish.ph}</p>}
        {fish.waterHardness && <p className="mb-2 text-lg text-gray-700">Water Hardness: {fish.waterHardness}</p>}
        {fish.swimLevel && <p className="mb-2 text-lg text-gray-700">Swim Level: {fish.swimLevel}</p>}
        {fish.aggression && <p className="mb-2 text-lg text-gray-700">Aggression: {fish.aggression}</p>}
        {fish.behavior && <p className="mb-2 text-lg text-gray-700">Behavior: {fish.behavior}</p>}
        {fish.schooling && <p className="mb-2 text-lg text-gray-700">Schooling: {fish.schooling}</p>}
        {fish.popularity && <p className="mb-2 text-lg text-gray-700">Popularity: {fish.popularity}</p>}
        {fish.difficulty && <p className="mb-2 text-lg text-gray-700">Difficulty: {fish.difficulty}</p>}
        {fish.lighting && <p className="mb-2 text-lg text-gray-700">Lighting: {fish.lighting}</p>}
        {fish.food && <p className="mb-2 text-lg text-gray-700">Food: {fish.food}</p>}
        {fish.compatibility && <p className="mb-2 text-lg text-gray-700">Compatibility: {fish.compatibility}</p>}
        {fish.tankMates && <p className="mb-2 text-lg text-gray-700">Tank Mates: {fish.tankMates}</p>}
        {fish.breeding && <p className="mb-2 text-lg text-gray-700">Breeding: {fish.breeding}</p>}
        {fish.lifespan && <p className="mb-2 text-lg text-gray-700">Lifespan: {fish.lifespan}</p>}
        {fish.origin && <p className="mb-2 text-lg text-gray-700">Origin: {fish.origin}</p>}
        {fish.colorVariants && <p className="mb-2 text-lg text-gray-700">Color Variants: {fish.colorVariants}</p>}
        {fish.careNotes && <p className="mb-2 text-lg text-gray-700">Care Notes: {fish.careNotes}</p>}
        {fish.notes && <p className="mb-2 text-lg text-gray-700">Notes: {fish.notes}</p>}
      </div>
    </main>
  );
}
