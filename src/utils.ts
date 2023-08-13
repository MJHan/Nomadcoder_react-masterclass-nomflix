export function makeImagePath(id: string, format?: string) {
  return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}

// for github pages
export const BASE_URL = "/Nomadcoder_react-masterclass-nomflix";
