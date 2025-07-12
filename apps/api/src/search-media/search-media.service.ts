import { Inject, Injectable } from "@nestjs/common";
import { ItunesService } from "../itunes/itunes.service";
import { DRIZZLE_DB } from "../drizzle/drizzle.provider";
import { searchMedia } from "../drizzle/schema";
import { NodePgDatabase } from "drizzle-orm/node-postgres";
import { CachedSearchResult, ItunesMediaItem } from "@thmanyah/types";
import { desc, eq } from "drizzle-orm";

@Injectable()
export class SearchMediaService {
  constructor(
    private readonly itunesService: ItunesService,
    @Inject(DRIZZLE_DB) private readonly db: NodePgDatabase
  ) {}

  async search(params: {
    term: string;
    limit: number;
    country: string;
  }): Promise<Omit<CachedSearchResult, "id" | "createdAt">[]> {
    const itunesResults = await this.itunesService.searchPodcasts(
      params.term,
      params.limit,
      params.country
    );

    if (itunesResults.results.length === 0) {
      return [];
    }

    const mediaData = itunesResults.results.map((item) => ({
      collectionId: item.collectionId,
      artistName: item.artistName,
      collectionName: item.collectionName,
      artworkUrl: item.artworkUrl600,
      feedUrl: item.feedUrl,
      primaryGenreName: item.primaryGenreName,
      rawData: item,
    }));

    try {
      await this.db.insert(searchMedia).values(mediaData).onConflictDoNothing();
    } catch (error) {
      console.error("Failed to save search results:", error);
    }

    return mediaData;
  }

  async getRecentPodcasts(): Promise<CachedSearchResult[]> {
    const results = await this.db
      .select()
      .from(searchMedia)
      .orderBy(desc(searchMedia.createdAt))
      .limit(30);

    return results.map((result) => ({
      id: result.id,
      collectionId: result.collectionId,
      artistName: result.artistName,
      collectionName: result.collectionName,
      artworkUrl: result.artworkUrl || undefined,
      feedUrl: result.feedUrl || undefined,
      primaryGenreName: result.primaryGenreName || undefined,
      rawData: result.rawData as ItunesMediaItem,
      createdAt: result.createdAt,
    }));
  }

  async getPodcastById(id: number) {
    const result = await this.db
      .select()
      .from(searchMedia)
      .where(eq(searchMedia.collectionId, id));

    return result[0];
  }
}
