// const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const API_KEY = "fcd6ba1b246337a63043df427b019d4b";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IData {
  id: number;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  backdrop_path: string;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  overview: string;
  genre_ids: string[];
  original_language: string;
  origin_country?: string[];
  vote_average: number;
}

export interface IGetResult {
  dates?: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

export interface IGenresResult {
  genres: IGenre[];
}

export interface IGenre {
  id: number;
  name: string;
}

export enum MOVIE_CATEGORY {
  "LATEST" = "now_playing",
  "TOP_RATED" = "top_rated",
  "UPCOMING" = "upcoming",
  "POPULAR" = "popular",
  "TREND" = "trend",
}

export enum MOVIE_SLIDER_TITLE {
  "LATEST" = "Latest Movies",
  "TOP_RATED" = "Top Rated Movies",
  "UPCOMING" = "Upcoming Movies",
  "POPULAR" = "Popular",
  "TREND" = "Trending Movies",
}

export enum TV_CATEGORY {
  "LATEST" = "on_the_air",
  "TOP_RATED" = "top_rated",
  "AIRING_TODAY" = "airing_today",
  "POPULAR" = "popular",
  "TREND" = "trend",
}

export enum TV_SLIDER_TITLE {
  "LATEST" = "Latest Shows",
  "TOP_RATED" = "Top Rated Shows",
  "AIRING_TODAY" = "Airing Today",
  "POPULAR" = "Popular Shows",
  "TREND" = "Trending TV Shows",
}

export enum MENU_ID {
  "MOVIE" = "movies",
  "TV" = "tv",
  "SEARCH" = "search",
}

export function getGenres(type: string, timeWindow: string) {
  return fetch(
    `${BASE_PATH}/genre/${type}/list?api_key=${API_KEY}&language=ko`
  ).then((response) => response.json());
}

export function getTrendMovie(timeWindow: string) {
  return fetch(
    `${BASE_PATH}/trending/movie/${timeWindow}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getTrendTv(timeWindow: string) {
  return fetch(
    `${BASE_PATH}/trending/tv/${timeWindow}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getMovies(category: string) {
  return fetch(
    `${BASE_PATH}/movie/${category}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getTvShows(category: string) {
  return fetch(
    `${BASE_PATH}/tv/${category}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
