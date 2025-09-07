"use client";

import { useState } from "react";
import MovieCard from "@/components/movie/MovieCard";
import Badge from "@/components/common/Badge";
import StaffInfo from "@/components/common/StaffInfo";
import TrailerPlayButton from "@/components/movie/TrailerPlayButton";
import TrailerModal from "@/components/movie/TrailerModal";
import { Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { getPosterUrl, getBackdropUrl } from "@/lib/api";
import { Movie, CreditsData, TMDBResponse, Trailer } from "@/lib/types";

interface MovieDetailClientProps {
  movie: Movie;
  castdata: CreditsData;
  similardata: TMDBResponse;
  trailer: Trailer | undefined;
}

export default function MovieDetailClient({
  movie,
  castdata,
  similardata,
  trailer,
}: MovieDetailClientProps) {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handleTrailerClick = () => {
    if (trailer) {
      setIsTrailerOpen(true);
    }
  };

  return (
    <>
      <section className="flex justify-center">
        <div className="w-[1080px] flex flex-col gap-8">
          <div className="flex justify-between text-[#09090B] dark:text-white">
            <div>
              <h1 className="text-4xl font-bold leading-10">{movie.title}</h1>
              <p className="text-lg font-normal text-gray-600 dark:text-gray-300">
                {movie.release_date} · {movie.adult ? "18+" : "PG"} ·{" "}
                {movie.runtime} mins
              </p>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 dark:text-gray-300">
                Rating
              </p>
              <div className="flex">
                <Star className="w-7 h-7 fill-[#FDE047] text-[#FDE047]" />
                <div>
                  <p className="text-lg font-semibold">
                    {movie.vote_average?.toFixed(1)}
                    <span className="text-base font-normal text-[#71717A] dark:text-gray-400">
                      /10
                    </span>
                  </p>
                  <p className="text-[#71717A] dark:text-gray-400 text-base font-normal">
                    {movie.vote_count?.toLocaleString() || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-8 h-[428px]">
            {movie.poster_path ? (
              <Image
                src={getPosterUrl(movie.poster_path, "w500") || ""}
                alt={`${movie.title} poster`}
                width={290}
                height={428}
                className="w-[290px] rounded-sm"
              />
            ) : (
              <div className="w-[290px] h-[428px] bg-gray-200 dark:bg-gray-800 rounded-sm flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No image
                </p>
              </div>
            )}
            <div className="relative w-full rounded-sm overflow-hidden">
              {movie.backdrop_path ? (
                <Image
                  src={getBackdropUrl(movie.backdrop_path, "w500") || ""}
                  alt={`${movie.title} backdrop`}
                  width={500}
                  height={428}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No backdrop available
                  </p>
                </div>
              )}
              {trailer && <TrailerPlayButton onClick={handleTrailerClick} />}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="flex gap-3">
              {movie.genres?.map((genre: { id: number; name: string }) => (
                <Badge key={genre.id} genre={genre.name} />
              ))}
            </div>
            <div className="text-base font-normal text-[#09090B] dark:text-white">
              {movie.overview}
            </div>
            <div className="flex flex-col gap-5">
              <StaffInfo job="Director" role="Director" castdata={castdata} />
              <StaffInfo job="Writer" role="Writers" castdata={castdata} />
              <StaffInfo role="Stars" castdata={castdata} type="cast" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex justify-between pb-2">
              <p className="text-xl md:text-2xl font-semibold leading-8 text-gray-900 dark:text-white">
                More like this
              </p>
              <Link href={`/movies/${movie.id}/similar`}>
                <Button
                  variant="ghost"
                  className="flex items-center gap-2 text-[#09090B] dark:text-white"
                >
                  See more
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="flex gap-8">
              {similardata?.results?.slice(0, 5).map((sim) => (
                <Link
                  href={`/movies/${sim.id}`}
                  key={sim.id}
                  className="w-[200px] flex-shrink-0"
                >
                  <MovieCard movie={sim} priority={false} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {trailer && (
        <TrailerModal
          isOpen={isTrailerOpen}
          onClose={() => setIsTrailerOpen(false)}
          trailerKey={trailer.key}
          movieTitle={movie.title}
        />
      )}
    </>
  );
}
