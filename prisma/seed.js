const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const csv = require("csv-parser");

const prisma = new PrismaClient();

async function main() {
  // Clear existing fish
  await prisma.fish.deleteMany();

  const results = [];

  fs.createReadStream("freshwater_fish_with_corydoras_and_glofish.csv")
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      console.log(`Importing ${results.length} fish...`);

      for (const fish of results) {
        await prisma.fish.create({
          data: {
            name: fish.name,
            scientificName: fish.scientificName,
            featuredImage: `https://aquarium-fish-images.s3.us-east-2.amazonaws.com/fish_dataset/${fish.name
              .toLowerCase()
              .replace(/\s+/g, "_")}/000001.jpg`,
            slug: fish.name.toLowerCase().replace(/\s+/g, "_"),
            type: fish.type,
            size: fish.size,
            minimumTankSize: fish.tankSize, // maps CSV's tankSize to your schema's field
            temperature: fish.temperature,
            ph: fish.ph,
            waterHardness: fish.waterHardness,
            swimLevel: fish.swimLevel,
            aggression: fish.aggression,
            behavior: fish.behavior,
            schooling: fish.schooling,
            popularity: fish.popularity,
            difficulty: fish.difficulty,
            lighting: fish.lighting,
            food: fish.food,
            compatibility: fish.compatibility,
            tankMates: fish.tankMates,
            breeding: fish.breeding,
            lifespan: fish.lifespan,
            origin: fish.origin,
            colorVariants: fish.colorVariants,
            careNotes: fish.careNotes,
            notes: fish.notes,
          },
        });
      }

      console.log("✅ Done importing fish!");
      await prisma.$disconnect();
    });
}

main().catch(async (e) => {
  console.error("❌ Error during seed:", e);
  await prisma.$disconnect();
  process.exit(1);
});
