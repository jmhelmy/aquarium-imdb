"use client";

type FishCardProps = {
  name: string;
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
};

const DEFAULT_IMAGE =
  "https://t4.ftcdn.net/jpg/02/53/61/69/360_F_253616948_za22DUrpvoM6aBDyPZxXDXf1OVNZFhL4.jpg";

export default function FishCard({
  name,
  image,
  tankSize,
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
        src={image || DEFAULT_IMAGE}
        alt={name}
        className="w-full h-48 object-cover mb-4"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = DEFAULT_IMAGE;
        }}
      />
      <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
      {tankSize && <p className="text-sm text-gray-600">Tank Size: {tankSize}</p>}
      {temperature && <p className="text-sm text-gray-600">Temperature: {temperature}</p>}
      {ph && <p className="text-sm text-gray-600">pH: {ph}</p>}
      {swimLevel && <p className="text-sm text-gray-600">Swim Level: {swimLevel}</p>}
      {aggression && <p className="text-sm text-gray-600">Aggression: {aggression}</p>}
      {behavior && <p className="text-sm text-gray-600">Behavior: {behavior}</p>}
      {schooling && <p className="text-sm text-gray-600">Schooling: {schooling}</p>}
      {popularity && <p className="text-sm text-gray-600">Popularity: {popularity}</p>}
      {difficulty && <p className="text-sm text-gray-600">Difficulty: {difficulty}</p>}
    </div>
  );
}
