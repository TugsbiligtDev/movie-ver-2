"use client";
import React, { useState, useEffect } from "react";
import { Film, Search, ChevronDown, Moon, Sun } from "lucide-react";
import SearchBox from "../common/SearchBox";
import Link from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";
import { getGenres } from "@/lib/api";
import { Genre } from "@/lib/types";

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [isGenreDropdownOpen, setIsGenreDropdownOpen] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [isLoadingGenres, setIsLoadingGenres] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenres(data.genres || []);
      } catch {
        setGenres([]);
      } finally {
        setIsLoadingGenres(false);
      }
    };

    fetchGenres();
  }, []);

  const toggleGenreDropdown = () => {
    setIsGenreDropdownOpen(!isGenreDropdownOpen);
  };

  const handleGenreSelect = () => {
    setIsGenreDropdownOpen(false);
  };

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
            <div className="relative">
              <button
                onClick={toggleGenreDropdown}
                className="flex items-center gap-2 px-3 py-1 h-9 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-900 dark:text-white"
              >
                <ChevronDown className="w-4 h-4" />
                Genre
              </button>

              {isGenreDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-[570px] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
                      Genres
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      See lists of movies by genre
                    </p>

                    <div className="grid grid-cols-3 gap-2">
                      {isLoadingGenres ? (
                        <div className="col-span-3 text-center py-4">
                          <p className="text-gray-500 dark:text-gray-400">
                            Loading genres...
                          </p>
                        </div>
                      ) : genres.length > 0 ? (
                        genres.map((genre) => (
                          <Link
                            key={genre.id}
                            href={`/genre/${encodeURIComponent(genre.name)}`}
                            onClick={handleGenreSelect}
                            className="flex items-center justify-between px-3 py-2 text-sm border border-gray-200 dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                          >
                            <span className="text-gray-900 dark:text-white font-medium">
                              {genre.name}
                            </span>
                          </Link>
                        ))
                      ) : (
                        <div className="col-span-3 text-center py-4">
                          <p className="text-gray-500 dark:text-gray-400">
                            No genres available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

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

      {isGenreDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsGenreDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default Header;
