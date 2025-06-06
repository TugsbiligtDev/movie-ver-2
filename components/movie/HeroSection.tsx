"use client";

import { useState, useEffect } from "react";
import { Play, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const TMDB_ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmYxOGE1NWI2MGMxYWM4YWI3M2Q4NzVjZTExMjYxNiIsIm5iZiI6MTc0ODc2MTMyNC41OTcsInN1YiI6IjY4M2JmYWVjOWQxNjkzZGUyMzdmM2I5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZZd_2JXGEWZx2ngeTvi-DB-089Is2IWuUBqiG5p6uaY";

interface Movie {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  vote_average: number;
  status: string;
}

const HeroSection = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        const formattedMovies = data.results.slice(0, 6).map((movie: any) => ({
          id: movie.id,
          title: movie.title,
          overview: movie.overview,
          backdrop_path: `${TMDB_IMAGE_BASE_URL}${movie.backdrop_path}`,
          vote_average: movie.vote_average,
          status: "Now Playing",
        }));
        setMovies(formattedMovies);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);



  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  if (isLoading || movies.length === 0) {
    return (
      <section className="relative h-[85vh] 2xl:h-[70vh] overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </section>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <section className="relative h-[85vh] 2xl:h-[70vh] overflow-hidden">
      <div className="absolute">
        <img
          src={currentMovie.backdrop_path}
          alt={currentMovie.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="">
              <p className="font-normal text-white text-base">
                {currentMovie.status}:
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {currentMovie.title}
            </h1>

            <div className="flex items-center gap-2">
              <Star className="w-7 h-7 fill-[#FDE047] text-[#FDE047]" />
              <span className="text-white text-lg font-semibold">
                {currentMovie.vote_average.toFixed(1)}
              </span>
              <span className="text-[#71717A] text-base font-normal">/10</span>
            </div>

            <p className="text-[#FAFAFA] text-xs max-w-lg">
              {currentMovie.overview}
            </p>

            <Button
              variant={"secondary"}
              className="text-[#18181B] px-4 py-2 text-base font-semibold rounded-md"
            >
              <Play className="w-4 h-4 mr-1" />
              Watch Trailer
            </Button>
          </div>
        </div>

        <button 
          onClick={goToPrevious}
          className="absolute size-10 left-8 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 flex items-center justify-center cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-[#09090B]" />
        </button>

        <button 
          onClick={goToNext}
          className="absolute size-10 right-8 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 flex items-center justify-center cursor-pointer"
        >
          <ChevronRight className="w-5 h-5 text-[#09090B]" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;