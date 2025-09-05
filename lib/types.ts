export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  vote_count?: number;
  genre_ids: number[];
  adult: boolean;
  runtime?: number;
  genres?: Array<{ id: number; name: string }>;
}

export interface CastMember {
  id: number;
  name: string;
  character?: string;
  job?: string;
}

export interface CreditsData {
  cast: CastMember[];
  crew: CastMember[];
}

export interface Genre {
  id: number;
  name: string;
}

export interface TMDBResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}

export interface SearchResult {
  id: number;
  title: string;
  release_date: string;
  poster_path: string | null;
  vote_average: number;
}

export type Theme = "light" | "dark";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
