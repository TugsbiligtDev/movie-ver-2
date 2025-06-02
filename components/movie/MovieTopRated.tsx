"use client";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { Movie } from "@/lib/types";

const MovieTopRated = ({ text }: { text: string }) => {
  const [movieData, setMovieData] = useState<Movie[]>([]);

  const TMDB_BASE_URL =
    process.env.TMDB_BASE_URL || "https://api.themoviedb.org/3";
  const TMDB_IMAGE_BASE_URL =
    process.env.TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p/w500";
  const TMDB_ACCESS_TOKEN = process.env.TMDB_ACCESS_TOKEN;

  useEffect(() => {
    fetch(`${TMDB_BASE_URL}/movie/popular?language=en-US&page=1`, {
      headers: { Authorization: `Bearer ${TMDB_ACCESS_TOKEN}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data.results);
        console.log(data);
      });
  }, [TMDB_BASE_URL, TMDB_ACCESS_TOKEN]);

  return (
    <div>
      <div className="w-full mb-2">
        <div className="flex justify-between pb-2">
          <p className="text-xl md:text-2xl font-semibold leading-8">{text}</p>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-[#09090B] "
          >
            See more
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
        {movieData?.slice(0, 10).map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              image={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
              rating={movie.vote_average.toFixed(1)}
              title={movie.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MovieTopRated;
