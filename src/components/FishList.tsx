"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import FishCard from "./FishCard";
import FilterControls from "./FilterControls";

export type Fish = { /* …same as before… */ };

type FishListProps = { fishList: Fish[] };

export default function FishList({ fishList }: FishListProps) {
  const [search, setSearch] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [aggressionFilter, setAggressionFilter] = useState("");
  const [schoolingFilter, setSchoolingFilter] = useState("");
  const [filteredFish, setFilteredFish] = useState(fishList);
  const [typeFilter, setTypeFilter] = useState("");
  const [tankSizeFilter, setTankSizeFilter] = useState("");
  const [popularityFilter, setPopularityFilter] = useState("");


  useEffect(() => {
    const lower = search.toLowerCase();
    setFilteredFish(
      fishList.filter(fish => (
        (fish.name.toLowerCase().includes(lower) || fish.scientificName.toLowerCase().includes(lower)) &&
        (!difficultyFilter || fish.difficulty === difficultyFilter) &&
        (!aggressionFilter || fish.aggression === aggressionFilter) &&
        (!schoolingFilter || fish.schooling === schoolingFilter)
      ))
    );
  }, [search, difficultyFilter, aggressionFilter, schoolingFilter, fishList]);

  return (
    <>
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
        tankSize={tankSizeFilter}
        onTankSizeChange={setTankSizeFilter}
        popularity={popularityFilter}
        onPopularityChange={setPopularityFilter}
        />


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
