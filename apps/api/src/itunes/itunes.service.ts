import { Injectable } from "@nestjs/common";
import axios from "axios";
import { ItunesSearchResponse } from "@thmanyah/types";

@Injectable()
export class ItunesService {
  private readonly baseUrl = "https://itunes.apple.com/search";

  async searchPodcasts(
    term: string,
    limit: number = 50,
    country: string = "US"
  ): Promise<ItunesSearchResponse> {
    const params = new URLSearchParams({
      term,
      entity: "podcast",
      limit: limit.toString(),
      lang: "ar_SA",
      country: "SA",
    });

    try {
      const { data } = await axios.get<ItunesSearchResponse>(
        `${this.baseUrl}?${params}`
      );
      return data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`iTunes API error: ${error.message}`);
      }
      throw error;
    }
  }
}
