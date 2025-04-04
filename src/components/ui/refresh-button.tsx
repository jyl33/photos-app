// components/ui/refresh-button.tsx
'use client';
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function RefreshButton() {
  const router = useRouter();
  
  return (
    <Button 
      className="h-[30px]"
      variant="outline" 
      title="Refresh"
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
  );
}