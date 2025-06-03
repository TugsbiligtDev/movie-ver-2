import HeroSection from "@/components/movie/HeroSection";
import MoviePopular from "@/components/movie/MoviePopular";
import MovieTopRated from "@/components/movie/MovieTopRated";
import MovieUpcoming from "@/components/movie/MovieUpcoming";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pb-12">
        <HeroSection />
        <div className="container mx-auto px-4 py-8">
          <MovieUpcoming />
          <MoviePopular />
          <MovieTopRated />
        </div>
      </main>
    </div>
  );
}
