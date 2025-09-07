import { Star } from "lucide-react";
import { Movie } from "@/lib/types";
import Image from "next/image";
import { getPosterUrl } from "@/lib/api";

interface MovieCardProps {
  movie: Movie;
  priority?: boolean;
}

const MovieCard = ({ movie, priority = false }: MovieCardProps) => {
  const rating = movie.vote_average?.toFixed(1) || "N/A";

  return (
    <div className="w-full h-auto flex flex-col cursor-pointer">
      {movie.poster_path ? (
        <Image
          src={getPosterUrl(movie.poster_path, "w500") || ""}
          alt={`${movie.title} poster`}
          width={300}
          height={450}
          className="w-full aspect-[2/3] object-cover rounded-t-md"
          priority={priority}
        />
      ) : (
        <div className="w-full aspect-[2/3] bg-gray-200 dark:bg-gray-800 rounded-t-md flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm">No image</p>
        </div>
      )}
      <div className="flex flex-col p-2 bg-[#F4F4F5] dark:bg-gray-900 rounded-b-md">
        <div className="flex gap-0.5 items-center">
          <Star className="w-4 h-4 fill-[#FDE047] text-[#FDE047]" />
          <p className="text-sm text-[#09090B] dark:text-white font-normal">
            {rating}
            <span className="text-[#71717A] dark:text-gray-400">/10</span>
          </p>
        </div>
        <p className="text-[#09090B] dark:text-white text-base sm:text-lg font-normal h-[50px]">
          {movie.title}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
