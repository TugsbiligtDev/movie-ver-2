import { Star } from "lucide-react";
export default async function SearchPage({
  params,
}: {
  params: { searchTerm: string };
}) {
  const TMDB_API_KEY = "bbf18a55b60c1ac8ab73d875ce112616";
  const searchTerm = params.searchTerm; // avengers
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
  );
  const data = await res.json();
  const results = data.results;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
        {results &&
          results.map((result: string) => (
            <div
              className="w-full h-auto flex flex-col cursor-pointer"
              key={result.id}
            >
              <img
                src={`https:image.tmdb.org/t/p/w500${result.poster_path}`}
                alt={`${result.title} poster`}
                className=" w-full h-full  rounded-t-md"
              />
              <div className="flex flex-col p-2 bg-[#F4F4F5] rounded-b-md">
                <div className="flex gap-0.5 items-center">
                  <Star className="w-4 h-4 fill-[#FDE047] text-[#FDE047]" />
                  <p className="text-sm text-[#09090B] font-normal">
                    {result.vote_average}
                    <span className="text-[#71717A]">/10</span>
                  </p>
                </div>
                <p className="text-[#09090B] text-base sm:text-lg font-normal h-[50px]">
                  {result.title}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
