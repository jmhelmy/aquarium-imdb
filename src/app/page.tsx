import Link from "next/link";
import { prisma } from "../lib/prisma";
import FishCard from "../components/FishCard";

export default async function Home() {
  // Fetch fish data, ordered by creation time (newest first)
  const fishList = await prisma.fish.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-blue-50 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-900 mb-6 text-center">
          Aquarium IMDb 🐠
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {fishList.map((fish) => (
            <Link key={fish.id} href={`/fish/${fish.id}`}>
              <FishCard
                name={fish.name}
                image={fish.image}
                tankSize={fish.tankSize}
                temperature={fish.temperature}
                ph={fish.ph}
                swimLevel={fish.swimLevel}
                aggression={fish.aggression}
                behavior={fish.behavior}
                schooling={fish.schooling}
                popularity={fish.popularity}
                difficulty={fish.difficulty}
              />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
