"use client";

type FilterControlsProps = {
  search: string;
  onSearchChange: (val: string) => void;
  difficulty: string;
  onDifficultyChange: (val: string) => void;
  aggression: string;
  onAggressionChange: (val: string) => void;
  schooling: string;
  onSchoolingChange: (val: string) => void;
  type: string;
  onTypeChange: (val: string) => void;
  tankSize: string;
  onTankSizeChange: (val: string) => void;
  popularity: string;
  onPopularityChange: (val: string) => void;
};

export default function FilterControls({
  search,
  onSearchChange,
  difficulty,
  onDifficultyChange,
  aggression,
  onAggressionChange,
  schooling,
  onSchoolingChange,
  type,
  onTypeChange,
  tankSize,
  onTankSizeChange,
  popularity,
  onPopularityChange,
}: FilterControlsProps) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-6">
      <input
        type="text"
        value={search}
        onChange={e => onSearchChange(e.target.value)}
        placeholder="Search fish..."
        className="px-4 py-2 border rounded bg-white text-gray-800 placeholder-gray-500 focus:ring-2 focus:ring-blue-400"
      />

      <select
        value={difficulty}
        onChange={e => onDifficultyChange(e.target.value)}
        className="px-4 py-2 border rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Intermediate">Intermediate</option>
        <option value="Hard">Hard</option>
      </select>

      <select
        value={aggression}
        onChange={e => onAggressionChange(e.target.value)}
        className="px-4 py-2 border rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Aggression</option>
        <option value="Peaceful">Peaceful</option>
        <option value="Semi‑aggressive">Semi‑aggressive</option>
        <option value="Aggressive">Aggressive</option>
      </select>

      <select
        value={schooling}
        onChange={e => onSchoolingChange(e.target.value)}
        className="px-4 py-2 border rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Schooling</option>
        <option value="Yes">Yes</option>
        <option value="No">No</option>
      </select>

      <select
        value={type}
        onChange={e => onTypeChange(e.target.value)}
        className="px-4 py-2 border rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Types</option>
        <option value="Freshwater">Freshwater</option>
        <option value="Saltwater">Saltwater</option>
      </select>

      <select
        value={tankSize}
        onChange={e => onTankSizeChange(e.target.value)}
        className="px-4 py-2 border rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Tank Sizes</option>
        <option value="Small">Small (&lt;10 gal)</option>
        <option value="Medium">Medium (10–30 gal)</option>
        <option value="Large">Large (&gt;30 gal)</option>
      </select>

      <select
        value={popularity}
        onChange={e => onPopularityChange(e.target.value)}
        className="px-4 py-2 border rounded bg-white text-gray-800 focus:ring-2 focus:ring-blue-400"
      >
        <option value="">All Popularities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
}
