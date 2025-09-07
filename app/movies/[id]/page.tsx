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
    return (
      <div>
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );
  }
}
