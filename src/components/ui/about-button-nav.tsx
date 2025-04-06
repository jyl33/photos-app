// components/ui/refresh-button.tsx
'use client';
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function AboutButtonNav() {
  const router = useRouter();
  
  return (
    <Button 
      className="h-[30px]"
      variant="outline" 
      title="about"
      onClick={(_e) => { router.push('/about'); }}
    >
      <Info className="h-4 w-4" />
    </Button>
  );
}