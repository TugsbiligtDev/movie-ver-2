import MovieCard from "@/components/movie/MovieCard";
import Badge from "@/components/common/Badge";
import StaffInfo from "@/components/common/StaffInfo";
import { Star } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
  const TMDB_ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmYxOGE1NWI2MGMxYWM4YWI3M2Q4NzVjZTExMjYxNiIsIm5iZiI6MTc0ODc2MTMyNC41OTcsInN1YiI6IjY4M2JmYWVjOWQxNjkzZGUyMzdmM2I5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZZd_2JXGEWZx2ngeTvi-DB-089Is2IWuUBqiG5p6uaY";

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    }
  );

  const movie = await res.json();

  return (
    <div className="w-[1440px] flex flex-col gap-8">
      <div className="flex justify-between text-[#09090B]">
        <div>
          <h1 className="text-4xl font-bold leading-10">{movie.title}</h1>
          <p className="text-lg font-normal">
            {movie.release_date} · {movie.adult ? "18+" : "PG"} ·{" "}
            {movie.runtime} mins
          </p>
        </div>
        <div>
          <p className="text-xs font-medium">Rating</p>
          <div className="flex">
            <Star className="w-7 h-7 fill-[#FDE047] text-[#FDE047]" />
            <div>
              <p className="text-lg font-semibold">
                {movie.vote_average?.toFixed(1)}
                <span className="text-base font-normal text-[#71717A]">
                  /10
                </span>
              </p>
              <p className="text-[#71717A] text-base font-normal">
                {movie.vote_count} votes
              </p>

              <p className="text-[#71717] text-base font-normal">37k</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-8 h-[428px]">
        <img src="/first.jpg" alt="small" className="w-[290px] rounded-sm" />
        <img src="/Feature.jpg" alt="big pic" className="w-full rounded-sm" />
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex gap-3">
          {movie.genres?.map((genre) => (
            <Badge key={genre.id} genre={genre.name} />
          ))}
        </div>

        <div className="text-base font-normal text-[#09090B]">
          {movie.overview}
        </div>
        <div className="flex flex-col gap-5">
          {movie.credits?.cast?.slice(0, 3).map((person) => (
            <StaffInfo
              key={person.id}
              name={person.name}
              role={person.character}
            />
          ))}
        </div>
      </div>
      <div className="flex gap-8">
        {movie.similar?.results?.slice(0, 5).map((sim) => (
          <MovieCard
            key={sim.id}
            image={`https://image.tmdb.org/t/p/w300${sim.poster_path}`}
            rating={sim.vote_average}
            title={sim.title}
          />
        ))}
      </div>
    </div>
  );
}
