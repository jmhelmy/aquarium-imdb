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
        <p className="text-xl text-gray-800 mb-4">{fish.scientificName}</p>

        {fish.image && (
          <img
            src={fish.image}
            alt={fish.name}
            className="w-full h-auto mb-4 object-cover rounded"
          />
        )}

        {fish.tankSize && (
          <p className="mb-2 text-lg text-gray-700">Tank Size: {fish.tankSize}</p>
        )}
        {fish.temperature && (
          <p className="mb-2 text-lg text-gray-700">Temperature: {fish.temperature}</p>
        )}
        {fish.ph && (
          <p className="mb-2 text-lg text-gray-700">pH: {fish.ph}</p>
        )}
        {fish.difficulty && (
          <p className="mb-2 text-lg text-gray-700">Difficulty: {fish.difficulty}</p>
        )}
        {/* Add more fields as needed */}
      </div>
    </main>
  );
}
