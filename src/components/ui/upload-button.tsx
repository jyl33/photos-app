'use client';

import { Button } from "@/components/ui/button";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { UploadCloud, RefreshCw } from "lucide-react";

export default function UploadButton() {

  return (
    <div className="flex gap-2">
      <Button asChild>
        <CldUploadButton
          uploadPreset="piep2kdj"
          options={{ maxFiles: 1 }}
        >
          <UploadCloud /> 
        </CldUploadButton>
      </Button>
    </div>
  );
}