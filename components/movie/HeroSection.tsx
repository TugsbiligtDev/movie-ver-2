"use client";

import { useState } from "react";
import { Play, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const mockMovie = {
  id: 1,
  title: "Spider-Man: No Way Home",
  overview:
    "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.",
  backdrop_path:
    "https://image.tmdb.org/t/p/original/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
  vote_average: 8.4,
  status: "Now Playing",
};

const HeroSection = () => {
  const [currentMovie, setCurrentMovie] = useState(mockMovie);

  return (
    <section className="relative h-[85vh] overflow-hidden">
      <div className="absolute">
        <img
          src={currentMovie.backdrop_path}
          alt={currentMovie.title}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Status Badge */}
            <div className="">
              <p className="font-normal text-white text-base">
                {currentMovie.status}:
              </p>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {currentMovie.title}
            </h1>

            <div className="flex items-center gap-2">
              <Star className="w-7 h-7 fill-[#FDE047] text-[#FDE047]" />
              <span className="text-white text-lg font-semibold">
                {currentMovie.vote_average.toFixed(1)}
              </span>
              <span className="text-[#71717A] text-base font-normal">/10</span>
            </div>

            <p className="text-[#FAFAFA] text-xs max-w-lg">
              {currentMovie.overview}
            </p>

            <Button
              variant={"secondary"}
              className="text-[#18181B] px-4 py-2 text-base font-semibold rounded-md"
            >
              <Play className="w-4 h-4 mr-1" />
              Watch Trailer
            </Button>
          </div>
        </div>

        {/* Navigation Arrow */}
        <button className="absolute size-10 right-8 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-3 flex items-center justify-center cursor-pointer">
          <ChevronRight className="w-5 h-5 text-[#09090B]" />
        </button>
      </div>
    </section>
  );
};
export default HeroSection;
