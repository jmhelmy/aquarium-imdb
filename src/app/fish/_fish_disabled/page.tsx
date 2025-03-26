export const dynamic = "force-dynamic";

import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const fishId = Number(params.id);
  const fish = await prisma.fish.findUnique({ where: { id: fishId } });
  if (!fish) return notFound();

  return (
    <main className="min-h-screen bg-blue-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">{fish.name}</h1>
        <p className="text-xl text-gray-800 mb-4">{fish.scientificName}</p>
        {fish.image && <img src={fish.image} alt={fish.name} className="w-full rounded mb-4" />}
        {/* rest of fields */}
      </div>
    </main>
  );
}
