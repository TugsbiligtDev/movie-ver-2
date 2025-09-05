"use client";

import { Play } from "lucide-react";

interface TrailerPlayButtonProps {
  onClick: () => void;
}

const TrailerPlayButton = ({ onClick }: TrailerPlayButtonProps) => {
  return (
    <div className="absolute bottom-4 left-4">
      <button onClick={onClick} className="flex items-center gap-3 text-white">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-black/20">
          <Play
            className="size-4 text-black ml-0.5"
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        </div>
        <div className="text-left">
          <p className="font-semibold text-base">Play trailer</p>
        </div>
      </button>
    </div>
  );
};

export default TrailerPlayButton;
