'use client';

import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import {
  CldUploadButton,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { UploadCloud, RefreshCw } from "lucide-react";

export default function UploadButton() {
  const router = useRouter();

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
      <Button 
        variant="outline" 
        onClick={(e) => {
          const icon = e.currentTarget.querySelector('.refresh-icon') as HTMLElement;
          if (icon) {
            icon.classList.add('animate-spin');
            router.refresh();
            setTimeout(() => icon.classList.remove('animate-spin'), 1000);
          }
        }}
        >
        <RefreshCw className="h-4 w-4 refresh-icon" />
        </Button>
    </div>
  );
}