import { Skeleton } from "@/components/ui/skeleton";

const SectionHeaderSkeleton = () => {
  return (
    <>
      <Skeleton className="h-8 w-32" />
      <Skeleton className="h-8 w-24" />
    </>
  );
};

export default SectionHeaderSkeleton;
