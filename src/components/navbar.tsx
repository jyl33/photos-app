'use client';

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import AuthButton from "@/components/ui/auth-button";
import LayoutSwitcher from "@/components/ui/layout-switcher";
import UploadButton from "@/components/ui/upload-button";
import RefreshButton from "@/components/ui/refresh-button";
import { LogOut } from "lucide-react";
import { Info } from "lucide-react"
import { toast } from "@/hooks/use-toast";
import AboutButton from "./ui/about-button";
import AboutButtonNav from "./ui/about-button-nav";

const Navbar = () => {
    const { data: session } = authClient.useSession();

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
        <div className="flex justify-between items-center pb-4 pt-3 h-[60px] px-2 md:px-2">
            <LayoutSwitcher /> 
            <a href="/" className="text-md">📸 photos</a>
            { session ? <p className="text-md hidden md:block">welcome, {session.user?.name}</p> : null}
            <div className="flex gap-2">
            { session ? <Button className="h-[30px]" title="Sign Out" variant="outline" onClick={ handleSignOut }><LogOut className="w-4 h-4" /></Button> : null}
            { session ? <UploadButton /> : null}
            { session ? <RefreshButton />: <AboutButtonNav/> }
            </div>
        </div>
    )
}

export default Navbar;