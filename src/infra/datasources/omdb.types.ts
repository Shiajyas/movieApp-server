

export interface OmdbSearchItem {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Type: string;
}

export interface OmdbSearchResponse {
  Search?: OmdbSearchItem[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}

export interface OmdbMovieResponse {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Plot: string;
  Type: string;
}
