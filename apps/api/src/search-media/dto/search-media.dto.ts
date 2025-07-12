import { IsString, IsOptional, IsNumber, Min, Max } from "class-validator";
import { Transform } from "class-transformer";

export class SearchMediaDto {
  @IsString()
  term!: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @Min(1)
  @Max(200)
  limit?: number = 50;

  @IsOptional()
  @IsString()
  country?: string = "US";
}

export class PodcastItem {
  collectionId!: number;
  artistName!: string;
  collectionName!: string;
  artworkUrl600?: string;
  feedUrl?: string;
  primaryGenreName?: string;
  kind!: string;
  trackCount?: number;
  releaseDate?: string;
  collectionViewUrl?: string;
  genres?: string[];
}
