export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

// when github pages
// export const BASE_URL = "/Nomadcoder_react-masterclass-nomflix";

// when localhost
export const BASE_URL = "";
