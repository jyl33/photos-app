'use client';

import { Button } from "@/components/ui/button";
import { ScanFace } from "lucide-react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AuthButton() {
  //const { data: session } = useSession()
  const router = useRouter();

  //if (session) {
  //    return null
  //}

  return (
    <Button 
      variant="outline" 
      onClick={(_e) => { router.push('/sign-in'); }}
    >
      <ScanFace className="h-5 w-5 scan-face"/>
    </Button>
  );
}