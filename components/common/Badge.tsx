import { ChevronRight } from "lucide-react";
import Link from "next/link";
const Badge = ({ genre }: { genre: string }) => {
  return (
    <Link href={genre}>
      <div className="flex gap-2 py-0.5 pr-1 pl-2.5 border border-[#E4E4E7] rounded-full">
        <p className="text-xs text-[#09090B] font-semibold leading-4">
          {genre}
        </p>
        <ChevronRight className="w-4 h-4" />
      </div>
    </Link>
  );
};

export default Badge;
