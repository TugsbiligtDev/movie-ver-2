import Link from "next/link";
import { getSimilarMovies, getMovieDetails } from "@/lib/api";
import MovieCard from "@/components/movie/MovieCard";
import { Movie } from "@/lib/types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default async function SimilarMoviesPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { id } = await params;
  const { page: rawPage } = await searchParams;
  const currentPage = parseInt(rawPage || "1", 10);
  const page = Math.max(1, Math.min(currentPage, 500));

  try {
    const [movie, data] = await Promise.all([
      getMovieDetails(id),
      getSimilarMovies(id, page),
    ]);

    const results = data.results || [];
    const totalPages = Math.min(data.total_pages || 1, 500);
    const totalResults = data.total_results || 0;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Movies similar to {movie.title}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Showing {results.length} of {totalResults.toLocaleString()} movies
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No similar movies found.
            </p>
          </div>
        ) : (
          <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
            {results.map((result: Movie) => (
              <Link href={`/movies/${result.id}`} key={result.id}>
                <MovieCard movie={result} priority={false} />
              </Link>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8">
            <Pagination>
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href={`/movies/${id}/similar?page=${page - 1}`}
                    />
                  </PaginationItem>
                )}

                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <PaginationItem key={pageNum}>
                      <PaginationLink
                        href={`/movies/${id}/similar?page=${pageNum}`}
                        isActive={pageNum === page}
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                {totalPages > 5 && page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}

                {totalPages > 5 && page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationLink
                      href={`/movies/${id}/similar?page=${totalPages}`}
                    >
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                )}

                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      href={`/movies/${id}/similar?page=${page + 1}`}
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div>{error instanceof Error ? error.message : "Unknown error"}</div>
    );
  }
}
