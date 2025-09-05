"use client";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "../skeleton/MovieCardSkeleton";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Movie } from "@/lib/types";
import Link from "next/link";
import { getUpcomingMovies } from "@/lib/api";

const MovieUpcoming = () => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchUpcomingMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getUpcomingMovies(1);
      setMovieData(data.results || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUpcomingMovies();
  }, []);

  if (error) {
    return (
      <div>
        <div className="w-full p-4 text-center text-red-500">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="w-full mb-2">
        <div className="flex justify-between pb-2">
          <p className="text-xl md:text-2xl font-semibold leading-8 text-gray-900 dark:text-white">
            Upcoming
          </p>

          <Link href="/upcoming">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-[#09090B] dark:text-white"
            >
              See more
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
        {loading
          ? Array.from({ length: 10 }).map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))
          : movieData?.slice(0, 10).map((movie) => (
              <Link href={`/movies/${movie.id}`} key={movie.id}>
                <MovieCard movie={movie} priority={false} />
              </Link>
            ))}
      </div>
    </div>
  );
};

export default MovieUpcoming;
