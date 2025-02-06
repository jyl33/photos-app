'use client';

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { LogOut } from "lucide-react";
import { useRouter } from 'next/navigation';
import { authClient } from "@/lib/auth-client";

export default function SignOutButton() {
  const router = useRouter();

  return (
    <Button 
      variant="outline" 
      onClick={async () => {
        try {
          console.log('Attempting to sign out...');
          await authClient.signOut({
            fetchOptions: {
              onRequest: () => {
                toast({
                  title: "Signing out...",
                });
              },
              onSuccess() {
                toast({
                  title: "Signed out",
                });
                router.refresh();
                router.push("/");
              },
            },
          });
        } catch (error) {
          console.error('Error during sign out:', error);
          toast({
            title: "Error signing out",
            description: "Please try again",
            variant: "destructive",
          });
        }
      }}
    >
      <LogOut className="h-5 w-5 log-out"/>
    </Button>
  );
}