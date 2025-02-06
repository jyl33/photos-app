'use client';

import { Button } from "@/components/ui/button";
import { ScanFace } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function AuthButton() {
  const router = useRouter();

  return (
    <Button 
      variant="outline" 
      onClick={(_e) => { router.push('/sign-in'); }}
    >
      <ScanFace className="h-5 w-5 scan-face"/>
    </Button>
  );
}