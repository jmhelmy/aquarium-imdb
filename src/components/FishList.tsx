"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FishCard from "./FishCard";
import FilterControls from "./FilterControls";

export type Fish = {
  id: number;
  name: string;
  scientificName: string;
  image?: string;
  tankSize?: string;
  temperature?: string;
  ph?: string;
  swimLevel?: string;
  aggression?: string;
  behavior?: string;
  schooling?: string;
  popularity?: string;
  difficulty?: string;
  type?: string;
};

type FishListProps = { fishList: Fish[] };

export default function FishList({ fishList }: FishListProps) {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [aggressionFilter, setAggressionFilter] = useState("");
  const [schoolingFilter, setSchoolingFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [tankSizeFilter, setTankSizeFilter] = useState("");
  const [popularityFilter, setPopularityFilter] = useState("");
  const [sortOption, setSortOption] = useState("name");

  const [filteredFish, setFilteredFish] = useState(fishList);

  useEffect(() => {
    const lower = search.toLowerCase();

    let filtered = fishList.filter(fish => (
      (fish.name.toLowerCase().includes(lower) || fish.scientificName.toLowerCase().includes(lower)) &&
      (!difficultyFilter || fish.difficulty === difficultyFilter) &&
      (!aggressionFilter || fish.aggression === aggressionFilter) &&
      (!schoolingFilter || fish.schooling === schoolingFilter) &&
      (!typeFilter || fish.type === typeFilter) &&
      (!tankSizeFilter || fish.tankSize === tankSizeFilter) &&
      (!popularityFilter || fish.popularity === popularityFilter)
    ));

    if (sortOption === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "popularity") {
      filtered.sort((a, b) => {
        const popularityOrder = { High: 3, Medium: 2, Low: 1 };
        return (popularityOrder[b.popularity || ""] || 0) - (popularityOrder[a.popularity || ""] || 0);
      });
    }

    setFilteredFish(filtered);
  }, [
    search, difficultyFilter, aggressionFilter, schoolingFilter,
    typeFilter, tankSizeFilter, popularityFilter, sortOption, fishList
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
        search={search} onSearchChange={setSearch}
        difficulty={difficultyFilter} onDifficultyChange={setDifficultyFilter}
        aggression={aggressionFilter} onAggressionChange={setAggressionFilter}
        schooling={schoolingFilter} onSchoolingChange={setSchoolingFilter}
        type={typeFilter} onTypeChange={setTypeFilter}
        tankSize={tankSizeFilter} onTankSizeChange={setTankSizeFilter}
        popularity={popularityFilter} onPopularityChange={setPopularityFilter}
      />

      {/* Fish Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredFish.map(fish => (
          <Link key={fish.id} href={`/fish/${fish.id}`}>
            <FishCard {...fish} />
          </Link>
        ))}
      </div>
    </>
  );
}
