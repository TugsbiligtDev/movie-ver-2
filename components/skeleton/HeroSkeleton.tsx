import { Skeleton } from "@/components/ui/skeleton";

const HeroSkeleton = () => {
  return (
    <section className="relative h-[85vh] 2xl:h-[70vh] overflow-hidden">
      <Skeleton className="w-full h-full rounded-none" />
    </section>
  );
};

export default HeroSkeleton;
