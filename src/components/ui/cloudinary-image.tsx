"use client";
import { useState } from 'react';
import { CldImage } from 'next-cloudinary';

interface CloudinaryImageProps {
  src: string;
  alt: string;
  width: string | number;
  height: string | number;
  loading?: "lazy" | "eager";
  className?: string;
}

export function CloudinaryImage({ 
  src, 
  alt, 
  width, 
  height, 
  loading = "eager",
  className 
}: CloudinaryImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative overflow-hidden bg-gray-200 dark:bg-gray-800">
      {/* Loading animation */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-gray-200 to-transparent animate-[fadeUp_2s_ease-in-out] ${
          isLoading ? "visible" : "invisible"
        }`}
      />
      
      <CldImage
        src={src}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        loading={loading}
        className={`
          ${className || ''}
        `}
        onLoad={() => {
          setIsLoading(false);
          // Find and animate the parent card
          const card = document.querySelector(`[data-image-id="${src}"]`);
          if (card) {
            card.classList.remove('opacity-0');
            card.classList.add('opacity-100');
          }
        }}
      />
    </div>
  );
}