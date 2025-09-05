import { Skeleton } from "@/components/ui/skeleton";
import MovieCardSkeleton from "@/components/skeleton/MovieCardSkeleton";

const MovieDetailSkeleton = () => {
  return (
    <section className="flex justify-center">
      <div className="w-[1080px] flex flex-col gap-8">
        <Skeleton className="h-20 w-full" />

        <div className="flex gap-8 h-[428px]">
          <Skeleton className="w-[290px] h-[428px] rounded-sm" />
          <Skeleton className="w-full h-[428px] rounded-sm" />
        </div>

        <Skeleton className="h-40 w-full" />

        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-40" />
          <div className="flex gap-8">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="w-[200px] flex-shrink-0">
                <MovieCardSkeleton />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieDetailSkeleton;
