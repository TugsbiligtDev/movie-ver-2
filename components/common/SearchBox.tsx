"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Star, ChevronRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { SearchResult } from "@/lib/types";
import { searchMovies } from "@/lib/api";

const SearchBox = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const searchMoviesData = async (query: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await searchMovies(query, 1);
        setResults(data.results?.slice(0, 5) || []);
        setShowDropdown(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Search failed");
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      if (search.trim().length >= 2) {
        searchMoviesData(search.trim());
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest("[data-search-dropdown]")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (search.trim().length >= 2) {
      router.push(`/search/${encodeURIComponent(search.trim())}`);
      setShowDropdown(false);
    }
  };

  const handleResultClick = (movie: SearchResult) => {
    router.push(`/movies/${movie.id}`);
    setSearch("");
    setShowDropdown(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="relative w-full" data-search-dropdown>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Search movies..."
          className="pl-10"
          value={search}
          onChange={handleInputChange}
          onFocus={() => {
            if (results.length > 0) {
              setShowDropdown(true);
            }
          }}
        />
      </form>

      {showDropdown && (
        <div
          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-y-auto"
          style={{ width: "577px", maxHeight: "400px" }}
        >
          {isLoading ? (
            <div className="p-4 flex justify-center items-center h-[300px]">
              <Loader2 className="h-12 w-12 animate-spin text-gray-400" />
            </div>
          ) : error ? (
            <div className="p-4 h-[300px] flex items-center justify-center">
              <p className="text-red-500 text-center">{error}</p>
            </div>
          ) : results.length > 0 ? (
            <div>
              {results.map((movie) => (
                <button
                  key={movie.id}
                  onClick={() => handleResultClick(movie)}
                  className="w-full flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left border-b border-gray-100 dark:border-gray-800 last:border-b-0"
                >
                  <div className="w-16 h-24 bg-gray-200 dark:bg-gray-700 rounded flex-shrink-0">
                    {movie.poster_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
                        alt={movie.title}
                        width={64}
                        height={96}
                        className="w-full h-full object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                        No Image
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white text-lg mb-1">
                      {movie.title}
                    </h4>
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-4 h-4 fill-[#FDE047] text-[#FDE047]" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {movie.release_date
                        ? new Date(movie.release_date).getFullYear()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm">
                    <span>See more</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              ))}
              <div className="p-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => {
                    router.push(`/search/${encodeURIComponent(search)}`);
                    setShowDropdown(false);
                  }}
                  className="w-full text-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  See all results for &ldquo;{search}&rdquo;
                </button>
              </div>
            </div>
          ) : search.length >= 2 ? (
            <div className="p-4 h-[300px] flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400 text-center">
                No movies found for &ldquo;{search}&rdquo;
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
