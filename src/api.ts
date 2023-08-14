// const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const API_KEY = "fcd6ba1b246337a63043df427b019d4b";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export enum MOVIE_CATEGORY {
  "LATEST" = "now_playing",
  "TOP_RATED" = "top_rated",
  "UPCOMING" = "upcoming",
  "POPULAR" = "popular",
}

export enum MOVIE_SLIDER_TITLE {
  "LATEST" = "Latest Movies",
  "TOP_RATED" = "Top Rated Movies",
  "UPCOMING" = "Upcoming Movies",
  "POPULAR" = "Popular",
}

export enum TV_CTEGORY {
  "LATEST" = "on_the_air",
  "TOP_RATED" = "top_rated",
  "AIRING_TODAY" = "airing_today",
  "POPULAR" = "popular",
}

export enum TV_SLIDER_TITLE {
  "LATEST" = "Latest Shows",
  "TOP_RATED" = "Top Rated Shows",
  "AIRING_TODAY" = "Airing Today",
  "POPULAR" = "Popular Shows",
}

export enum MENU_ID {
  "MOVIE" = "movies",
  "TV" = "tv",
  "SEARCH" = "search",
}

export function getMovies(category: string) {
  return fetch(`${BASE_PATH}/movie/${category}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTvShows(category: string) {
  return fetch(
    `${BASE_PATH}/tv/${category}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}
