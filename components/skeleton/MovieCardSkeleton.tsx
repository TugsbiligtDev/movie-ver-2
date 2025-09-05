import { Skeleton } from "@/components/ui/skeleton";

const MovieCardSkeleton = () => {
  return (
    <div className="w-full h-auto flex flex-col cursor-pointer">
      <Skeleton className="w-full h-[400px] rounded-md" />
    </div>
  );
};

export default MovieCardSkeleton;
