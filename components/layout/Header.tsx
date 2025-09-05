"use client";
import React from "react";
import { Film, Search, Moon, Sun } from "lucide-react";
import SearchBox from "../common/SearchBox";
import Link from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="w-full py-3 bg-white dark:bg-black relative z-50 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <nav className="flex justify-between items-center">
          <Link
            href="/"
            className="flex gap-2 items-center text-indigo-700 dark:text-indigo-400 cursor-pointer"
          >
            <Film className="w-5 h-5" />
            <p className="text-base font-bold">Movie Z</p>
          </Link>

          <div className="hidden md:flex gap-3 items-center">
            <div className="relative w-64 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <SearchBox />
            </div>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 cursor-pointer" />
            ) : (
              <Moon className="w-4 h-4 cursor-pointer" />
            )}
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
