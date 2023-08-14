// const API_KEY = "10923b261ba94d897ac6b81148314a3f";
const API_KEY = "fcd6ba1b246337a63043df427b019d4b";
const BASE_PATH = "https://api.themoviedb.org/3";

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

export interface IDetail {
  adult: false;
  backdrop_path: string;
  first_air_date?: string;
  release_date?: string;
  genres: IGenre[];
  homepage: string;
  id: number;
  in_production?: false;
  languages?: string[];
  last_air_date?: string;
  name?: string;
  title?: string;
  runtime?: string;
  networks?: INetwork;
  number_of_episodes?: number;
  number_of_seasons?: number;
  origin_country?: string[];
  original_language: string;
  original_name?: string;
  original_title?: string;
  overview: string;
  tagline: string;
  poster_path: string;
  status: string;
  type: string;
  vote_average: number;
  // "last_episode_to_air": {
  //   "id": 4340162,
  //   "name": "집",
  //   "overview": "인류의 모든 희망이 퓨리에게 달려 있다.",
  //   "vote_average": 6.2,
  //   "vote_count": 18,
  //   "air_date": "2023-07-26",
  //   "episode_number": 6,
  //   "episode_type": "finale",
  //   "production_code": "",
  //   "runtime": 38,
  //   "season_number": 1,
  //   "show_id": 114472,
  //   "still_path": "/3RJU5QMdfz6ufTocIcLOzN0wM9M.jpg"
  // },
}

export interface INetwork {
  id: number;
  logo_path: string;
  name: string;
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
  "SEARCH" = "movie_search",
}

export enum MOVIE_SLIDER_TITLE {
  "LATEST" = "Latest Movies",
  "TOP_RATED" = "Top Rated Movies",
  "UPCOMING" = "Upcoming Movies",
  "POPULAR" = "Popular",
  "TREND" = "Trending Movies This Week",
  "SEARCH" = "Movie Search Results",
}

export enum TV_CATEGORY {
  "LATEST" = "on_the_air",
  "TOP_RATED" = "top_rated",
  "AIRING_TODAY" = "airing_today",
  "POPULAR" = "popular",
  "TREND" = "trend",
  "SEARCH" = "tv_search",
}

export enum TV_SLIDER_TITLE {
  "LATEST" = "Latest Shows",
  "TOP_RATED" = "Top Rated Shows",
  "AIRING_TODAY" = "Airing Today",
  "POPULAR" = "Popular Shows",
  "TREND" = "Trending TV Shows This Week",
  "SEARCH" = "TV Show Search Results",
}

export enum MENU_ID {
  "MOVIE" = "movie",
  "TV" = "tv",
  "SEARCH" = "search",
}

// export function getGenres(type: string, timeWindow: string) {
//   return fetch(
//     `${BASE_PATH}/genre/${type}/list?api_key=${API_KEY}&language=ko`
//   ).then((response) => response.json());
// }

export function getTrend(menuId: string, timeWindow: string) {
  return fetch(
    `${BASE_PATH}/trending/${menuId}/${timeWindow}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

export function getResults(menuId: string, category: string) {
  return fetch(
    `${BASE_PATH}/${menuId}/${category}?api_key=${API_KEY}&language=ko-KR`
  ).then((response) => response.json());
}

// export function getTvShows(category: string) {
//   return fetch(
//     `${BASE_PATH}/tv/${category}?api_key=${API_KEY}&language=ko-KR`
//   ).then((response) => response.json());
// }

export function getSearch(menuId: string, query: string) {
  return fetch(
    `${BASE_PATH}/search/${menuId}?api_key=${API_KEY}&language=ko-KR&include_adult=true&query=${encodeURIComponent(
      query
    )}`
  ).then((response) => response.json());
}

export function getDetail(menuId: string, id: string | number) {
  return fetch(
    `${BASE_PATH}/${menuId}/${id}?api_key=${API_KEY}&&language=ko-KR`
  ).then((response) => response.json());
}
