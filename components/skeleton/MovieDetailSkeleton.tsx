import { Skeleton } from "@/components/ui/skeleton";
import MovieCardSkeleton from "@/components/skeleton/MovieCardSkeleton";

const MovieDetailSkeleton = () => {
  return (
    <section className="flex justify-center">
      <div className="w-[1080px] flex flex-col gap-8">
        <div className="flex justify-between text-[#09090B] dark:text-white">
          <div>
            <Skeleton className="h-10 w-80 mb-2" />
            <Skeleton className="h-6 w-64" />
          </div>
          <div>
            <Skeleton className="h-4 w-12 mb-2" />
            <div className="flex">
              <Skeleton className="w-7 h-7 rounded-sm mr-2" />
              <div>
                <Skeleton className="h-6 w-16 mb-1" />
                <Skeleton className="h-4 w-20" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8 h-[428px]">
          <Skeleton className="w-[290px] h-[428px] rounded-sm" />
          <div className="relative w-full rounded-sm overflow-hidden">
            <Skeleton className="w-full h-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Skeleton className="w-16 h-16 rounded-full" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-20 rounded-full" />
            ))}
          </div>

          <Skeleton className="h-20 w-full" />

          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-32" />
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-40" />
            </div>

            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between pb-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-8 w-20" />
          </div>
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
