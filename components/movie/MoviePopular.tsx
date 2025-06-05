"use client";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import { ChevronRight } from "lucide-react";
import { Movie } from "@/lib/types";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const MoviePopular = () => {
  const [movieData, setMovieData] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  //  /genre/movie/list?language=en

  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
  const TMDB_ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmYxOGE1NWI2MGMxYWM4YWI3M2Q4NzVjZTExMjYxNiIsIm5iZiI6MTc0ODc2MTMyNC41OTcsInN1YiI6IjY4M2JmYWVjOWQxNjkzZGUyMzdmM2I5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZZd_2JXGEWZx2ngeTvi-DB-089Is2IWuUBqiG5p6uaY";

  const fetchUpcomingMovies = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setMovieData(data.results || []);
      console.log(data);
    } catch (err) {
      console.error("Error fetching upcoming movies:", err);
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
          <p className="text-xl md:text-2xl font-semibold leading-8">Popular</p>
          <Link href="popular">
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-[#09090B] "
            >
              See more
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative">
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {loading
            ? // Loading placeholder - you can customize this
              Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="w-full">
                  <Skeleton className="w-full h-[440px]" />
                </div>
              ))
            : movieData?.slice(0, 10).map((movie) => {
                return (
                  <Link href={`/movies/${movie.id}`} key={movie.id}>
                    <MovieCard
                      image={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                      rating={movie.vote_average}
                      title={movie.title}
                    />
                  </Link>
                );
              })}
        </div>
      </div>
    </div>
  );
};

export default MoviePopular;
