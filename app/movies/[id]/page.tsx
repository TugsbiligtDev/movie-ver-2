import MovieCard from "@/components/movie/MovieCard";
import Badge from "@/components/common/Badge";
import StaffInfo from "@/components/common/StaffInfo";
import { Divide, Star } from "lucide-react";

export default async function Page({ params }: { params: { id: string } }) {
  const TMDB_ACCESS_TOKEN =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYmYxOGE1NWI2MGMxYWM4YWI3M2Q4NzVjZTExMjYxNiIsIm5iZiI6MTc0ODc2MTMyNC41OTcsInN1YiI6IjY4M2JmYWVjOWQxNjkzZGUyMzdmM2I5OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ZZd_2JXGEWZx2ngeTvi-DB-089Is2IWuUBqiG5p6uaY";

  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    }
  );

  const movie = await res.json();
  console.log(movie);

  const cast = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/credits?language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    }
  );

  const castdata = await cast.json();

  // const name = castdata.crew
  //   .slice(0, 5)
  //   .map((person) => console.log(person.name));
  // console.log(name);

  // const directing = castdata.crew.map((person) =>
  //   console.log(person.known_for_department.filter())
  // );
  // console.log(directing);

  console.log(castdata);

  const similar = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}/similar?language=en-US&page=1`,
    {
      headers: {
        Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`,
      },
    }
  );

  const similardata = await similar.json();
  console.log(similardata);

  return (
    <div className="w-[1080px] flex flex-col gap-8">
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

              <p className="text-[#71717] text-base font-normal">37k</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-8 h-[428px]">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt="small"
          className="w-[290px] rounded-sm"
        />
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`}
          alt="big pic"
          className="w-full rounded-sm"
        />
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
          {/* {castdata?.crew?.map(
            (cast: { job: string; original_name: string }) => {
              if (cast.job === "Director") {
                return <span className="px-2 ">{cast.original_name}</span>;
              }
            }
          )} */}
          <div className="w-full">
            <div className="flex text-[#09090B] gap-[53px] text-base pb-1 ">
              <h3 className="font-bold">Director</h3>
              <p className="font-normal">
                Winnie Holzman · Dana Fox · Gregory Maguire
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-8">
        {similardata?.results?.slice(0, 5).map((sim) => (
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
