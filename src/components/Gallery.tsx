"use client";
import React from "react";

interface GalleryProps {
  imageUrls: string[];
  fishName: string;
}

export default function Gallery({ imageUrls, fishName }: GalleryProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {imageUrls.map((url, index) => (
        <img
          key={index}
          src={url}
          alt={`Image ${index + 1} of ${fishName}`}
          className="w-full h-auto object-cover rounded shadow"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
      ))}
    </div>
  );
}
