const API_KEY = import.meta.env.VITE_OMDBAPI_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

import type { MovieDetail, MovieResponse } from './types/movie';

// Generic fetch function   
async function fetchFromTMDB<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${BASE_URL}${endpoint}?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}

// Fetch popular movies
export async function fetchPopularMovies(): Promise<MovieResponse> {
  return fetchFromTMDB<MovieResponse>('/movie/popular');
}

// Fetch trending movies (daily)
export async function fetchTrendingMovies(): Promise<MovieResponse> {
  return fetchFromTMDB<MovieResponse>('/trending/movie/day');
}

// Fetch top rated movies
export async function fetchTopRatedMovies(): Promise<MovieResponse> {
  return fetchFromTMDB<MovieResponse>('/movie/top_rated');
}

// Fetch movie details by ID
export async function fetchMovieDetail(movieId: string | number): Promise<MovieDetail> {
  return fetchFromTMDB<MovieDetail>(`/movie/${movieId}`);
}

// Search movies
export async function searchMovies(query: string): Promise<MovieResponse> {
  if (!query.trim()) {
    return { page: 1, results: [], total_pages: 0, total_results: 0 };
  }

  const response = await fetch(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
  if (!response.ok) {
    throw new Error(`Search error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<MovieResponse>;
}

// Fetch movie by genre
export async function fetchMoviesByGenre(genreId: number): Promise<MovieResponse> {
  return fetchFromTMDB<MovieResponse>(`/discover/movie&with_genres=${genreId}`);
}

// Legacy function for backward compatibility
export async function fetchMovieT<T>(): Promise<T> {
  const response = await fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}`);
  if (!response.ok) {
    throw new Error(`Fetch error: ${response.status} ${response.statusText}`);
  }
  return response.json() as Promise<T>;
}
