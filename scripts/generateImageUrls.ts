const fish = { slug: "neon_tetra" };

const imageUrls = Array.from({ length: 30 }, (_, i) =>
  `https://aquarium-fish-images.s3.us-east-2.amazonaws.com/fish_dataset/${fish.slug}/${String(i + 1).toString().padStart(6, '0')}.jpg`
);

console.log(imageUrls);
