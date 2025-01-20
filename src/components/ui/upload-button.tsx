"use client";

import { Button } from "@/components/ui/button";
import { classifyImage } from "@/lib/classifyImage";
import { getExifData } from "@/lib/getExifData";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useRouter } from "next/navigation";

export default function UploadButton() {
  const router = useRouter();

  return (
    <Button asChild>
      <CldUploadButton
        onSuccess={ async (result: CloudinaryUploadWidgetResults) => {
          try {
            // Make sure result.info is a single item and not an array
            const info = Array.isArray(result.info) ? result.info[0] : result.info;

            console.log("Uploaded image info: ", info);
            console.log("public id", info.public_id);
            
            // Call classifyImage with the uploaded image URL
            if (info?.secure_url && info?.public_id) {
              const addImageClassification = await classifyImage(info?.secure_url, info?.public_id);
              const addExifData = await getExifData(info?.secure_url, info?.public_id);

              if(!addImageClassification) console.log("Fetching image classification failed");
              if(!addExifData) console.log("Fetching exif data failed")
            }

            setTimeout(() => {
              console.log("refresh");
              router.refresh();
            }, 2000);
          } catch (error) {
            
          }
        }}
        uploadPreset="piep2kdj"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      </CldUploadButton>
    </Button>
  );
}
