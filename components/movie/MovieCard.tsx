import { Star } from "lucide-react";
import { Card } from "@/lib/types";

const MovieCard = ({ image, rating, title }: Card) => {
  return (
    <div className="w-full h-auto flex flex-col cursor-pointer">
      <img
        src={image}
        alt={`${title} poster`}
        className="w-full aspect-[2/3] object-cover rounded-t-md"
      />
      <div className="flex flex-col p-2 bg-[#F4F4F5] rounded-b-md">
        <div className="flex gap-0.5 items-center">
          <Star className="w-4 h-4 fill-[#FDE047] text-[#FDE047]" />
          <p className="text-sm text-[#09090B] font-normal">
            {rating}
            <span className="text-[#71717A]">/10</span>
          </p>
        </div>
        <p className="text-[#09090B] text-base sm:text-lg font-normal h-[50px]">
          {title}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
