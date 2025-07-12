export interface ItunesSearchResponse {
  resultCount: number;
  results: ItunesMediaItem[];
}

export interface ItunesMediaItem {
  collectionId: number;
  artistName: string;
  collectionName: string;
  artworkUrl30?: string;
  artworkUrl60?: string;
  artworkUrl100?: string;
  artworkUrl600?: string;
  feedUrl?: string;
  primaryGenreName?: string;
  trackCount?: number;
  releaseDate?: string;
  collectionViewUrl?: string;
  genres?: string[];
  [key: string]: any;
}

export interface CachedSearchResult {
  id: number;
  createdAt: Date;
  collectionId: number;
  artistName: string;
  collectionName: string;
  artworkUrl?: string;
  feedUrl?: string;
  primaryGenreName?: string;
  rawData: ItunesMediaItem;
}
