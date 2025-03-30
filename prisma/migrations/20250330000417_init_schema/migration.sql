-- CreateTable
CREATE TABLE "Fish" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "scientificName" TEXT NOT NULL,
    "image" TEXT,
    "type" TEXT,
    "size" TEXT,
    "tankSize" TEXT,
    "temperature" TEXT,
    "ph" TEXT,
    "waterHardness" TEXT,
    "swimLevel" TEXT,
    "aggression" TEXT,
    "behavior" TEXT,
    "schooling" TEXT,
    "popularity" TEXT,
    "difficulty" TEXT,
    "lighting" TEXT,
    "food" TEXT,
    "compatibility" TEXT,
    "tankMates" TEXT,
    "breeding" TEXT,
    "lifespan" TEXT,
    "origin" TEXT,
    "colorVariants" TEXT,
    "careNotes" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Fish_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "fishId" INTEGER NOT NULL,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_fishId_fkey" FOREIGN KEY ("fishId") REFERENCES "Fish"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
