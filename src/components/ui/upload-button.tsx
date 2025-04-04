'use client';

import { Button } from "@/components/ui/button";
import {
  CldUploadButton, CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { UploadCloud, RefreshCw } from "lucide-react";
import { getMetadada } from "@/lib/imageUpload";

export default function UploadButton() {

  return (
    <div className="flex gap-2">
      <Button className="h-[30px]" variant="outline" title="Upload" asChild>
        <CldUploadButton
          uploadPreset="piep2kdj"
          options={{ maxFiles: 1, maxFileSize: 10000000 }}
          onQueuesStart = {() => {
            console.log("Upload started");
          }}
          onQueuesEnd = {() => {
            console.log("Upload completed");
          }}
          onRetry = {() => {
            console.log("Upload retry");
          }}
          onError = {() => {
            console.log("Upload error");
          }}
          onSuccess = {(result, { widget }) => {
            console.log("Upload success", result);
            const jsonResults = JSON.stringify(result?.info);
            getMetadada(jsonResults);
          }}
        >
          <UploadCloud /> 
        </CldUploadButton>
      </Button>
    </div>
  );
}