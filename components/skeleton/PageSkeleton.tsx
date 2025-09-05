import { Skeleton } from "@/components/ui/skeleton";
import HeroSkeleton from "./HeroSkeleton";
import MovieCardSkeleton from "./MovieCardSkeleton";
import React from "react";

const PageSkeleton = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="pb-12">
        <HeroSkeleton />

        <div className="container mx-auto px-4 py-8">
          <div className="mb-16">
            <div className="w-full mb-2">
              <div className="flex justify-between pb-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
              {Array.from({ length: 10 }).map((_, index) => (
                <MovieCardSkeleton key={`upcoming-${index}`} />
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="w-full mb-2">
              <div className="flex justify-between pb-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
              {Array.from({ length: 10 }).map((_, index) => (
                <MovieCardSkeleton key={`popular-${index}`} />
              ))}
            </div>
          </div>

          <div className="mb-16">
            <div className="w-full mb-2">
              <div className="flex justify-between pb-2">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-8 w-24" />
              </div>
            </div>
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
              {Array.from({ length: 10 }).map((_, index) => (
                <MovieCardSkeleton key={`top-rated-${index}`} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PageSkeleton;
