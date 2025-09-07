"use client";

import { useState, useEffect } from "react";
import { Play, Star, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeroSkeleton from "@/components/skeleton/HeroSkeleton";
import { getPopularMovies, getBackdropUrl, getMovieVideos } from "@/lib/api";
import { Movie, HeroMovie, Trailer } from "@/lib/types";
import TrailerModal from "./TrailerModal";

const HeroSection = () => {
  const [movies, setMovies] = useState<HeroMovie[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const fetchMovies = async () => {
    try {
      const data = await getPopularMovies(1);
      const moviesToProcess = data.results.slice(0, 5);

      const moviesWithTrailers = await Promise.all(
        moviesToProcess.map(async (movie: Movie) => {
          const videos = await getMovieVideos(movie.id.toString()).catch(
            () => ({ results: [] })
          );
          const trailer = videos.results?.find(
            (video: Trailer) =>
              video.type === "Trailer" && video.site === "YouTube"
          );

          return {
            ...movie,
            backdrop_path: getBackdropUrl(movie.backdrop_path),
            status: "Now Playing",
            trailer: trailer || undefined,
          };
        })
      );

      setMovies(moviesWithTrailers);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch movies");
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

  const handleTrailerClick = () => {
    setIsTrailerOpen(true);
  };

  if (isLoading) {
    return <HeroSkeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (movies.length === 0) {
    return (
      <section className="relative h-[85vh] 2xl:h-[70vh] overflow-hidden bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">No movies available</div>
      </section>
    );
  }

  const currentMovie = movies[currentIndex];

  return (
    <section className="relative h-[85vh] 2xl:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={currentMovie.backdrop_path}
          alt={currentMovie.title}
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      <div className="relative z-10 h-full flex items-center">
        <div className="w-full max-w-2xl ml-16 md:ml-20 lg:ml-24">
          <div>
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

          {currentMovie.trailer && (
            <Button
              variant={"secondary"}
              className="bg-white/90 hover:bg-white text-[#18181B] px-4 py-2 text-base font-semibold rounded-md"
              onClick={handleTrailerClick}
            >
              <Play className="w-4 h-4 mr-1" />
              Watch Trailer
            </Button>
          )}
        </div>

        <button
          onClick={goToPrevious}
          className="absolute size-10 left-2 md:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 flex items-center justify-center cursor-pointer z-20"
        >
          <ChevronLeft className="w-5 h-5 text-[#09090B]" />
        </button>

        <button
          onClick={goToNext}
          className="absolute size-10 right-2 md:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 flex items-center justify-center cursor-pointer z-20"
        >
          <ChevronRight className="w-5 h-5 text-[#09090B]" />
        </button>
      </div>

      {currentMovie.trailer && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          trailerKey={currentMovie.trailer.key}
          movieTitle={currentMovie.title}
        />
      )}
    </section>
  );
};

export default HeroSection;
