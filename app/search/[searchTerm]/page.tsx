import { Movie } from "@/lib/types";
import { searchMovies } from "@/lib/api";
import MovieCard from "@/components/movie/MovieCard";
import Link from "next/link";

export default async function SearchPage({
  params,
}: {
  params: Promise<{ searchTerm: string }>;
}) {
  const { searchTerm: rawSearchTerm } = await params;
  const searchTerm = decodeURIComponent(rawSearchTerm);

  try {
    const data = await searchMovies(searchTerm, 1);
    const results = data.results || [];

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">
          Search results for {searchTerm}
        </h1>
        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
          {results.map((result: Movie) => (
            <Link href={`/movies/${result.id}`} key={result.id}>
              <MovieCard movie={result} priority={false} />
            </Link>
          ))}
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div>
        {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    );
  }
}
