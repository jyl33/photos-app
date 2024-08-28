"use client";

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

type uploadResult = {
  info: {
    public_id: string;
  }; // the value currently in the public ID input field
  event: "success";
};

export default function Home() {
  const [imageId, setImageId] = useState("");

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <CldUploadButton
        onSuccess={(result: CloudinaryUploadWidgetResults) => {
          if (result.info && typeof result.info !== "string")
            setImageId(result.info.public_id);
          else console.log("Upload info is not available");
        }}
        uploadPreset="piep2kdj"
      />

      {imageId && (
        <CldImage
          width="400"
          height="300"
          src={imageId}
          sizes="100vw"
          alt="Description of my image"
        />
      )}
    </main>
  );
}
