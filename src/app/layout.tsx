import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SpeedInsights } from "@vercel/speed-insights/next"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Photo Blog",
  description: "My AI enhanced photo blog!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" >
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <div className="flex-grow">
          <div className="flex w-full justify-center pt-5 min-h-screen">
            <div className="flex flex-col w-full max-w-7xl mx-auto">
              {children}
            </div>
          </div>
        </div>
        <Toaster />
        <SpeedInsights/>
      </body>
    </html>
  );
}
