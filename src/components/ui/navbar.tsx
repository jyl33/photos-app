'use client';

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import AuthButton from "./auth-button";
import LayoutSwitcher from "./layout-switcher";
import UploadButton from "./upload-button";
import ImageRefreshListener from "../imageRefreshListener";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import RefreshButton from "./refresh-button";
import { useEffect } from "react";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Navbar = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    toast({
                        title: "Signed out successfully",
                    });
                },
                onError: (error) => {
                    toast({
                        title: "Error signing out",
                        variant: "destructive",
                    });
                }
            }
        });
        
    };

    return (
        <div className="flex justify-between items-center pb-4 pt-3">
              <LayoutSwitcher />
              <a href="/" className="text-sm">photos</a>
              { session ? <p className="text-sm">welcome, {session.user?.name}</p> : null}
              <div className="flex gap-2">
                { session ? <Button onClick={ handleSignOut }><LogOut className="w-4 h-4" /></Button> : <AuthButton />}
                { session ? <UploadButton /> : null}
                <RefreshButton />
              </div>
            </div>
    )
}

export default Navbar;