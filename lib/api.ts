const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

function getApiKey() {
  const apiKey = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  if (!apiKey) {
    throw new Error("TMDB API key is not configured");
  }
  return apiKey;
}

async function fetchData(url: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export async function getMovieDetails(movieId: string) {
  const url = `${BASE_URL}/movie/${movieId}?language=en-US`;
  return fetchData(url);
}

export async function getMovieCredits(movieId: string) {
  const url = `${BASE_URL}/movie/${movieId}/credits?language=en-US`;
  return fetchData(url);
}

export async function getSimilarMovies(movieId: string, page = 1) {
  const url = `${BASE_URL}/movie/${movieId}/similar?language=en-US&page=${page}`;
  return fetchData(url);
}

export async function getPopularMovies(page = 1) {
  const url = `${BASE_URL}/movie/popular?language=en-US&page=${page}`;
  return fetchData(url);
}

export async function getTopRatedMovies(page = 1) {
  const url = `${BASE_URL}/movie/top_rated?language=en-US&page=${page}`;
  return fetchData(url);
}

export async function getUpcomingMovies(page = 1) {
  const url = `${BASE_URL}/movie/upcoming?language=en-US&page=${page}`;
  return fetchData(url);
}

export async function searchMovies(query: string, page = 1) {
  const encodedQuery = encodeURIComponent(query);
  const url = `${BASE_URL}/search/movie?query=${encodedQuery}&language=en-US&page=${page}`;
  return fetchData(url);
}

export async function getMoviesByGenre(genreId: number, page = 1) {
  const url = `${BASE_URL}/discover/movie?with_genres=${genreId}&language=en-US&page=${page}`;
  return fetchData(url);
}

export async function getGenres() {
  const url = `${BASE_URL}/genre/movie/list`;
  return fetchData(url);
}

export async function getMovieVideos(movieId: string) {
  const url = `${BASE_URL}/movie/${movieId}/videos?language=en-US`;
  return fetchData(url);
}

export function getImageUrl(path: string | null, size = "w500") {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${size}${path}`;
}

export function getPosterUrl(path: string | null, size = "w500") {
  if (!path) return null;
  return getImageUrl(path, size);
}

export function getBackdropUrl(path: string | null, size = "original") {
  return getImageUrl(path, size);
}
