import { Skeleton } from "@/components/ui/skeleton";
import MovieCardSkeleton from "./MovieCardSkeleton";

const SearchSkeleton = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Skeleton className="h-8 w-80 mb-6" />

      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
        {Array.from({ length: 20 }).map((_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default SearchSkeleton;
