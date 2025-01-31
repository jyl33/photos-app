import Image from "next/image";
import {
  CldUploadButton,
  CldUploadWidget,
  CldUploadButtonProps,
  CldUploadWidgetProps,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { CldImage } from "next-cloudinary";
import { classifyImage } from "../lib/classifyImage";
import { fetchImages } from "@/lib/fetchImages";
import { CloudinaryImage } from "./grid/cloudinary-image";
import { format } from "path";
import { metadata } from "./layout";
import type { SearchResult } from "@/lib/fetchImages";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function capitalizeFirstLetter(str?: string) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatDate(dateStr: string) {
  if (!dateStr) {
    return "N/A";
  }

  try {
    // Handle different date formats by normalizing separators
    const normalizedDateStr = dateStr.replace(/[-:\/]/g, ':');
    
    // Split into date and time parts
    const [date, time] = normalizedDateStr.split(' ');
    if (!date) return 'N/A';
    
    // Parse the date parts
    const [year, month, day] = date.split(':').map(Number);
    
    // Handle time if present
    let hours = 0, minutes = 0;
    if (time) {
      const timeParts = time.split(':').map(Number);
      hours = timeParts[0] || 0;
      minutes = timeParts[1] || 0;
    }
    
    // Validate date parts
    if (!year || !month || !day || isNaN(year) || isNaN(month) || isNaN(day)) {
      return 'N/A';
    }
    
    // Create date string in a consistent format
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: time ? 'numeric' : undefined,
      minute: time ? '2-digit' : undefined,
      hour12: true,
    }).format(new Date(year, month - 1, day, hours, minutes));

    return formattedDate;
  } catch (error) {
    console.error('Error formatting date:', error, 'for date string:', dateStr);
    return 'N/A';
  }
}

const HomePage = async () => {
  const images = await fetchImages();
  console.log('Page rendered');

  return (
    <div className="flex flex-col gap-4">
      {images.resources.map((result: SearchResult) => {
      const exifData = typeof result.metadata?.exif_data === 'string' 
        ? JSON.parse(result.metadata.exif_data)
        : result.metadata?.exif_data;

        return (
          <div key={result.public_id} className="flex flex-row gap-4 items-start pr-3.5 border border-black">
            <div className="flex-shrink-0 border-r border-black">
              <CloudinaryImage
                src={result.public_id}
                alt="an image of something"
                width="1000"
                height="500"
              />
            </div>
            <div className="flex flex-col space-y-2 max-w-56 pt-2">
              <p  className="font-bold text-lg" style={{ fontFamily: 'OfficeCodePro-Bold' }}>{result.metadata?.title}</p>
              <div className="text-xs space-y-1">
                <p>{formatDate(exifData?.dateTime.toString())}</p>
                <p>{exifData?.cameraMake} {exifData?.cameraModel}</p>
                <p>{exifData?.shutterSpeed} <br /> {exifData?.aperture} <br /> ISO {exifData?.ISO}</p>
                <p>{exifData?.lensMake} {exifData?.lensModel}</p>
                <p className="mt-2">
                  <br />
                  {capitalizeFirstLetter(result.metadata?.classification)} {result.metadata?.confidence}% Confident
                  <br/><br/>
                  {result.metadata?.description}
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