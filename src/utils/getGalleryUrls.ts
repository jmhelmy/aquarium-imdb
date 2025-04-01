export function getGalleryUrls(slug: string, count: number): string[] {
  let folderName = "";
  if (slug.includes("-")) {
    // If the slug is in kebab-case (e.g., "neon-tetra")
    folderName = slug
      .split("-")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("_");
  } else if (slug.includes("_")) {
    // If the slug already uses underscores (e.g., "black_skirt_tetra")
    folderName = slug
      .split("_")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join("_");
  } else {
    // For a single word (e.g., "betta")
    folderName = slug.charAt(0).toUpperCase() + slug.slice(1);
  }
  
  // Encode the folder name to handle special characters like parentheses.
  const encodedFolderName = encodeURIComponent(folderName);
  const baseUrl = `https://aquarium-fish-images.s3.us-east-2.amazonaws.com/fish-images/${encodedFolderName}`;
  
  return Array.from({ length: count }, (_, i) => {
    const imageNumber = (i + 1).toString().padStart(6, "0");
    return `${baseUrl}/${imageNumber}.jpg`;
  });
}
