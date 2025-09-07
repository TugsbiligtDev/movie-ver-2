import { Skeleton } from "@/components/ui/skeleton";
import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieListSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-64 mb-2" />
        <Skeleton className="h-4 w-48" />
      </div>

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
        {Array.from({ length: 20 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>

      <div className="flex justify-center">
        <Skeleton className="h-10 w-80" />
      </div>
    </div>
  );
};

export default MovieListSkeleton;
