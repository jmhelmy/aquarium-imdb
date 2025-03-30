import FishList from "../components/FishList";
import { prisma } from "../lib/prisma";

export default async function Home() {
  const fishList = await prisma.fish.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Serialize the data to ensure it's plain JSON for the client component
  const serializedFishList = JSON.parse(JSON.stringify(fishList));

  return (
    <main className="min-h-screen bg-blue-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">
          Fish Tank Guide!!!!
        </h1>
        <FishList fishList={serializedFishList} />
      </div>
    </main>
  );
}
