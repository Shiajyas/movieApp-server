import axios from "axios";
import { injectable } from "tsyringe";
import { OMDB_API_KEY } from "../../config/env";
import {
  OmdbSearchResponse,
  OmdbMovieResponse
} from "./omdb.types";

@injectable()
export class OmdbClient {
  private readonly baseUrl = "https://www.omdbapi.com/";

  async search(title: string, page = 1): Promise<OmdbSearchResponse> {
    const response = await axios.get<OmdbSearchResponse>(this.baseUrl, {
      params: {
        apikey: OMDB_API_KEY,
        s: title,
        page,
      },
    });

    return response.data;
  }

  async getById(imdbId: string): Promise<OmdbMovieResponse> {
    const response = await axios.get<OmdbMovieResponse>(this.baseUrl, {
      params: {
        apikey: OMDB_API_KEY,
        i: imdbId,
        plot: "full",
      },
    });

    return response.data;
  }
}
