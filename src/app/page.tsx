import { prisma } from "@/lib/prisma";
import FishList from "@/components/FishList";
import Head from "next/head";

export default async function HomePage() {
  // Fetch all fish from your database
  const fishList = await prisma.fish.findMany();

  return (
    <>
      <Head>
        <title>Aquarium Fish Gallery</title>
        <meta name="description" content="Explore our collection of aquarium fish." />
      </Head>
      <main className="min-h-screen bg-blue-50 py-10 px-6">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center">
          Aquarium Fish Gallery
        </h1>
        <FishList fishList={fishList} />
      </main>
    </>
  );
}
