export const dynamic = "force-dynamic";

import { prisma } from "../../../lib/prisma";
import { notFound } from "next/navigation";

export default async function FishDetailPage({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const fish = await prisma.fish.findUnique({
    where: { slug },
    include: { comments: true }, // ✅ Include comments
  });

  if (!fish) return notFound();

  const fieldList = [
    { label: "Type", value: fish.type },
    { label: "Size", value: fish.size },
    { label: "Minimum Tank Size", value: fish.minimumTankSize },
    { label: "Temperature", value: fish.temperature },
    { label: "pH", value: fish.ph },
    { label: "Water Hardness", value: fish.waterHardness },
    { label: "Swim Level", value: fish.swimLevel },
    { label: "Aggression", value: fish.aggression },
    { label: "Behavior", value: fish.behavior },
    { label: "Schooling", value: fish.schooling },
    { label: "Popularity", value: fish.popularity },
    { label: "Difficulty", value: fish.difficulty },
    { label: "Lighting", value: fish.lighting },
    { label: "Food", value: fish.food },
    { label: "Compatibility", value: fish.compatibility },
    { label: "Tank Mates", value: fish.tankMates },
    { label: "Breeding", value: fish.breeding },
    { label: "Lifespan", value: fish.lifespan },
    { label: "Origin", value: fish.origin },
    { label: "Color Variants", value: fish.colorVariants },
    { label: "Care Notes", value: fish.careNotes },
    { label: "Notes", value: fish.notes },
  ];

  return (
    <main className="min-h-screen bg-blue-50 py-10 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4 text-blue-900">{fish.name}</h1>
        <p className="text-xl text-gray-800 mb-4">{fish.scientificName}</p>

        {fish.featuredImage && (
          <img
            src={fish.featuredImage}
            alt={fish.name}
            className="w-full h-auto mb-4 object-cover rounded"
          />
        )}

        {fieldList.map(
          (field) =>
            field.value && (
              <p key={field.label} className="mb-2 text-lg text-gray-700">
                <strong>{field.label}:</strong> {field.value}
              </p>
            )
        )}

        {/* 🔵 Comments Section */}
        <h2 className="text-2xl font-bold mt-10 text-blue-900">Comments</h2>

        <ul className="mt-4 mb-6">
          {fish.comments?.length > 0 ? (
          fish.comments.map((comment: { id: number; content: string }) => (
              <li key={comment.id} className="border border-gray-300 p-3 mb-2 rounded bg-white shadow-sm text-gray-800">
                {comment.content}
              </li>
            ))
          ) : (
            <p className="text-gray-600">No comments yet.</p>
          )}
        </ul>

        {/* 🔵 Comment Form */}
        <form
          className="bg-white p-4 rounded shadow-md"
          action="/api/comments"
          method="POST"
        >
          <input type="hidden" name="fishId" value={fish.id} />
          <textarea
            name="content"
            required
            placeholder="Leave a comment..."
            className="w-full p-2 border border-gray-300 rounded mb-2 text-gray-800"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Comment
          </button>
        </form>
      </div>
    </main>
  );
}
