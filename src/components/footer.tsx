'use client';

import { authClient } from "@/lib/auth-client";
import AuthButton from "./ui/auth-button";
import AboutButton from "@/components/ui/about-button";

const Footer = () => {
    const { data: session } = authClient.useSession();

    return (
        <div className="flex justify-between items-center pb-4 pt-2 px-3">
              <div className="flex gap-2">
                { session ? null : <AuthButton />}
              </div>
              <div className="flex gap-2">
                <AboutButton />
              </div>
        </div>
    )
}

export default Footer;