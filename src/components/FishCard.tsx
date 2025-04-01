"use client";

type FishCardProps = {
  id?: number;
  name: string;
  featuredImage?: string; // This will be overridden by the homepage prop.
  minimumTankSize?: string;
  temperature?: string;
  ph?: string;
  swimLevel?: string;
  aggression?: string;
  behavior?: string;
  schooling?: string;
  popularity?: string;
  difficulty?: string;
};

const DEFAULT_IMAGE =
  "https://t4.ftcdn.net/jpg/02/53/61/69/360_F_253616948_za22DUrpvoM6aBDyPZxXDXf1OVNZFhL4.jpg";

export default function FishCard({
  name,
  featuredImage,
  minimumTankSize,
  temperature,
  ph,
  swimLevel,
  aggression,
  behavior,
  schooling,
  popularity,
  difficulty,
}: FishCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-200 p-4">
      <img
        src={featuredImage || DEFAULT_IMAGE}
        alt={name}
        className="w-full h-48 object-cover mb-4 rounded"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = DEFAULT_IMAGE;
        }}
      />
      <h2 className="text-2xl font-bold text-blue-900 mb-2">{name}</h2>
      {minimumTankSize && (
        <p className="text-lg text-gray-700">
          Minimum Tank Size: {minimumTankSize}
        </p>
      )}
      {temperature && <p className="text-lg text-gray-700">Temperature: {temperature}</p>}
      {ph && <p className="text-lg text-gray-700">pH: {ph}</p>}
      {swimLevel && <p className="text-lg text-gray-700">Swim Level: {swimLevel}</p>}
      {aggression && <p className="text-lg text-gray-700">Aggression: {aggression}</p>}
      {behavior && <p className="text-lg text-gray-700">Behavior: {behavior}</p>}
      {schooling && <p className="text-lg text-gray-700">Schooling: {schooling}</p>}
      {popularity && <p className="text-lg text-gray-700">Popularity: {popularity}</p>}
      {difficulty && <p className="text-lg text-gray-700">Difficulty: {difficulty}</p>}
    </div>
  );
}
