'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { UploadCloud, RefreshCw } from "lucide-react";
import { useSession } from 'next-auth/react';

export default function UploadButton() {
  //const { data: session } = useSession()

  //if (!session) {
  //    return null
  //}

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