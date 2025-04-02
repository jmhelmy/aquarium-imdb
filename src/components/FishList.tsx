"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FishCard from "./FishCard";
import FilterControls from "./FilterControls";
import { getGalleryUrls } from "@/utils/getGalleryUrls";

export type Fish = {
  id: number;
  name: string;
  scientificName: string;
  featuredImage?: string;
  minimumTankSize?: string;
  temperature?: string;
  ph?: string;
  swimLevel?: string;
  aggression?: string;
  behavior?: string;
  schooling?: string;
  popularity?: string;
  difficulty?: string;
  type?: string;
  slug: string;
};

type FishListProps = { fishList: Fish[] };

export default function FishList({ fishList }: FishListProps) {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [aggressionFilter, setAggressionFilter] = useState("");
  const [schoolingFilter, setSchoolingFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [minimumTankSizeFilter, setMinimumTankSizeFilter] = useState("");
  const [popularityFilter, setPopularityFilter] = useState("");
  const [sortOption, setSortOption] = useState("name");

  const [filteredFish, setFilteredFish] = useState(fishList);

  useEffect(() => {
    const lower = search.toLowerCase();

    const filtered = fishList.filter((fish) => {
      const matchesSearch =
        fish.name.toLowerCase().includes(lower) ||
        fish.scientificName.toLowerCase().includes(lower);

      const matchesDifficulty = !difficultyFilter || fish.difficulty === difficultyFilter;
      const matchesAggression = !aggressionFilter || fish.aggression === aggressionFilter;
      const matchesSchooling = !schoolingFilter || fish.schooling === schoolingFilter;
      const matchesType = !typeFilter || fish.type === typeFilter;
      const matchesTankSize = !minimumTankSizeFilter || fish.minimumTankSize === minimumTankSizeFilter;
      const matchesPopularity = !popularityFilter || fish.popularity === popularityFilter;

      return (
        matchesSearch &&
        matchesDifficulty &&
        matchesAggression &&
        matchesSchooling &&
        matchesType &&
        matchesTankSize &&
        matchesPopularity
      );
    });

    if (sortOption === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "popularity") {
      const popularityOrder = { High: 3, Medium: 2, Low: 1 };
      filtered.sort(
        (a, b) =>
          (popularityOrder[b.popularity || ""] || 0) -
          (popularityOrder[a.popularity || ""] || 0)
      );
    }

    setFilteredFish(filtered);
  }, [
    search,
    difficultyFilter,
    aggressionFilter,
    schoolingFilter,
    typeFilter,
    minimumTankSizeFilter,
    popularityFilter,
    sortOption,
    fishList,
  ]);

  return (
    <>
      {/* Sorting Dropdown */}
      <div className="flex justify-center mb-4">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
        >
          <option value="name">Sort: Alphabetical (A–Z)</option>
          <option value="popularity">Sort: Popularity</option>
        </select>
      </div>

      {/* Filters */}
      <FilterControls
        search={search}
        onSearchChange={setSearch}
        difficulty={difficultyFilter}
        onDifficultyChange={setDifficultyFilter}
        aggression={aggressionFilter}
        onAggressionChange={setAggressionFilter}
        schooling={schoolingFilter}
        onSchoolingChange={setSchoolingFilter}
        type={typeFilter}
        onTypeChange={setTypeFilter}
        minimumTankSize={minimumTankSizeFilter}
        onMinimumTankSizeChange={setMinimumTankSizeFilter}
        popularity={popularityFilter}
        onPopularityChange={setPopularityFilter}
      />

      {/* Fish Cards */}
      {filteredFish.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filteredFish.map((fish) => {
            // Generate the URL for the fish image from your gallery
            const urls = getGalleryUrls(fish.slug, 1);
            const homepageFeatured = urls && urls.length > 0 ? urls[0] : "/fallback-image.jpg";

            return (
              <Link key={fish.id} href={`/fish/${fish.slug}`}>
                <FishCard {...fish} featuredImage={homepageFeatured} />
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center">No fish found.</p>
      )}
    </>
  );
}
