import { prisma } from "@/lib/prisma";
import FishList from "@/components/FishList";

// ✅ App Router way of setting metadata
export const metadata = {
  title: "Aquarium Fish Gallery",
  description: "Explore our collection of aquarium fish.",
};

export default async function HomePage() {
  const fishList = await prisma.fish.findMany();

  return (
    <main className="min-h-screen bg-blue-50 py-10 px-6">
      <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
        Aquarium Fish Gallery
      </h1>
      <FishList fishList={fishList} />
    </main>
  );
}
