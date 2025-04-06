"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GalleryVertical, LayoutGrid } from "lucide-react";

export default function LayoutSwitcher() {
    const pathname = usePathname();

    return (
      <div className="flex divide-x overflow-hidden divide-gray-300 dark:divide-gray-800 border box-border rounded-md border-gray-300 dark:border-gray-800 shadow-sm">
        <Link 
          className={`py-0.5 px-1.5 cursor-pointer hover:bg-gray-100/60 active:bg-gray-100 dark:hover:bg-gray-900/75 dark:active:bg-gray-900 ${
            pathname === "/" 
              ? "text-black dark:text-white" 
              : "text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
          }`}
          href="/"
          title="gallery"
        >
          <div className="w-7 h-6 flex items-center justify-center">
            <GalleryVertical size={18} />
          </div>
        </Link>
        <Link 
          className={`py-0.5 px-1.5 cursor-pointer hover:bg-gray-100/60 active:bg-gray-100 dark:hover:bg-gray-900/75 dark:active:bg-gray-900 ${
            pathname === "/grid" 
              ? "text-black dark:text-white" 
              : "text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
          }`}
          href="/grid"
          title="grid"
        >
          <div className="w-7 h-6 flex items-center justify-center">
            <LayoutGrid size={18} />
          </div>
        </Link>
      </div>
    )
}