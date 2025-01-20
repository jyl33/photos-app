import Image from "next/image";
import {
  CldUploadButton,
  CldUploadWidget,
  CldUploadButtonProps,
  CldUploadWidgetProps,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { useState } from "react";
import { classifyImage } from "../lib/classifyImage";
import { fetchImages } from "@/lib/fetchImages";
import { CloudinaryImage } from "./grid/cloudinary-image";
import { format } from "path";

// First, update your type definitions
type ExifData = {
  dateTime?: string;
  cameraMake?: string;
  cameraModel?: string;
  shutterSpeed?: string;
  aperture?: string;
  ISO?: string;
  focalLength?: string;
  lensMake?: string;
  lensModel?: string;
}

type SearchResult = {
  public_id: string;
  metadata?: {
    classification?: string;
    confidence?: string;
    exif_data?: string;
    classified_at?: string;
  };
}

function capitalizeFirstLetter(str?: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateStr: string) {

  if(!dateStr){
    return "N/A"
  }
  console.log("Date String", dateStr);
  // Split into date and time parts first
  const [date, time] = dateStr.split(' ');
  
  // Create a Date object (replace : with - in date for proper parsing)
  const dateObj = new Date(date.replace(/:/g, '-') + ' ' + time);
  
  // Format options for US style date
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  return dateObj.toLocaleString('en-US', options);
}

const HomePage = async () => {
  const images = await fetchImages();

  return (
    <div className="flex flex-col gap-4">
      {images.resources.map((result) => {
      const exifData = typeof result.metadata?.exif_data === 'string' 
        ? JSON.parse(result.metadata.exif_data)
        : result.metadata?.exif_data;

        return (
          <div key={result.public_id} className="flex flex-row gap-4 items-start">
            <div className="flex-shrink-0">
              <CloudinaryImage
                src={result.public_id}
                alt="an image of something"
                width="850"
                height="500"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <div className="text-xs space-y-1">
                <p>{exifData?.cameraMake} {exifData?.cameraModel}</p>
                <p>{formatDate(exifData?.dateTime.toString())}</p>
                <p>{exifData?.shutterSpeed} <br /> {exifData?.aperture} <br /> ISO {exifData?.ISO}</p>
                <p>{exifData?.lensMake} {exifData?.lensModel}</p>
                <p className="mt-2">
                  <br />
                  {capitalizeFirstLetter(result.metadata?.classification)} {result.metadata?.confidence}% Confident
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomePage;