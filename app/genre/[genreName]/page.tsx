import Link from "next/link";
import GenrePagination from "@/components/common/GenrePagination";
import { getMoviesByGenre } from "@/lib/api";
import MovieCard from "@/components/movie/MovieCard";
import { Movie } from "@/lib/types";

const genreMap: { [key: string]: number } = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Biography: 99,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  "Film-Noir": 10402,
  "Game-Show": 10764,
  History: 36,
  Horror: 27,
  Music: 10402,
  Musical: 10402,
  Mystery: 9648,
  News: 10763,
  "Reality-TV": 10764,
  Romance: 10749,
  "Sci-Fi": 878,
  Short: 1080,
  Sport: 10752,
  "Talk-Show": 10767,
  Thriller: 53,
  War: 10752,
  Western: 37,
};

export default async function GenrePage({
  params,
  searchParams,
}: {
  params: Promise<{ genreName: string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { genreName: rawGenreName } = await params;
  const { page: rawPage } = await searchParams;
  const genreName = decodeURIComponent(rawGenreName);
  const genreId = genreMap[genreName];
  const currentPage = parseInt(rawPage || "1", 10);
  const page = Math.max(1, Math.min(currentPage, 100));

  if (!genreId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Genre Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            The genre {genreName} was not found.
          </p>
          <Link
            href="/"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  try {
    const data = await getMoviesByGenre(genreId, page);
    const results = data.results || [];
    const totalPages = Math.min(data.total_pages || 1, 50);
    const totalResults = data.total_results || 0;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {genreName} Movies
          </h1>

          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Showing {results.length} of {totalResults.toLocaleString()} movies
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No {genreName.toLowerCase()} movies found.
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

        <GenrePagination
          currentPage={page}
          totalPages={totalPages}
          genreName={genreName}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Error Loading Movies
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            There was an error loading {genreName.toLowerCase()} movies:{" "}
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
          <Link
            href="/"
            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300"
          >
            Return to Home
          </Link>
        </div>
      </div>
    );
  }
}
