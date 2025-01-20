"use client";

import { CldImage } from "next-cloudinary";
import result from "postcss/lib/result";

export function CloudinaryImage(props: any) {
  return <CldImage {...props} />;
}
