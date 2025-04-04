"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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
        >
          <svg width="28" height="24" viewBox="0 0 28 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <title>Full Frame</title>
            <rect x="5.625" y="6.625" width="16.75" height="10.75" rx="1" strokeWidth="1.25"></rect>
            <line x1="5" y1="3.875" x2="23" y2="3.875" strokeWidth="1.25"></line>
            <line x1="23" y1="20.125" x2="5" y2="20.125" strokeWidth="1.25"></line>
          </svg>
        </Link>
        <Link 
          className={`py-0.5 px-1.5 cursor-pointer hover:bg-gray-100/60 active:bg-gray-100 dark:hover:bg-gray-900/75 dark:active:bg-gray-900 ${
            pathname === "/grid" 
              ? "text-black dark:text-white" 
              : "text-gray-400 dark:text-gray-600 hover:text-gray-700 dark:hover:text-gray-400"
          }`}
          href="/grid"
        >
          <svg width="28" height="24" viewBox="0 0 28 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
            <title>Grid</title>
            <rect x="5.625" y="6.625" width="16.75" height="10.75" rx="1" strokeWidth="1.25"></rect>
            <line x1="11.375" y1="7" x2="11.375" y2="18" strokeWidth="1.25"></line>
            <line x1="16.875" y1="7" x2="16.875" y2="18" strokeWidth="1.25"></line>
            <line x1="5" y1="12.0417" x2="22.3333" y2="12.0417" strokeWidth="1.25"></line>
          </svg>
        </Link>
      </div>
    )
}