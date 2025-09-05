import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  getMovieDetails,
  getMovieCredits,
  getSimilarMovies,
  getMovieVideos,
} from "@/lib/api";
import MovieDetailSkeleton from "@/components/skeleton/MovieDetailSkeleton";
import { Suspense } from "react";
import MovieDetailClient from "@/components/movie/MovieDetailClient";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<MovieDetailSkeleton />}>
      <MovieDetailContent params={params} />
    </Suspense>
  );
}

async function MovieDetailContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  try {
    const { id } = await params;
    const [movie, castdata, similardata, videos] = await Promise.all([
      getMovieDetails(id),
      getMovieCredits(id),
      getSimilarMovies(id, 1),
      getMovieVideos(id),
    ]);

    const trailer = videos.results?.find(
      (video: { type: string; site: string }) =>
        video.type === "Trailer" && video.site === "YouTube"
    );

    return (
      <MovieDetailClient
        movie={movie}
        castdata={castdata}
        similardata={similardata}
        trailer={trailer}
      />
    );
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return (
      <section className="flex justify-center items-center min-h-[50vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Error Loading Movie
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {error instanceof Error ? error.message : "Something went wrong"}
          </p>
          <Link href="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </div>
      </section>
    );
  }
}
