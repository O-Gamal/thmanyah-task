import {
  Controller,
  Get,
  Query,
  HttpException,
  HttpStatus,
  BadRequestException,
  Param,
} from "@nestjs/common";
import { SearchMediaService } from "./search-media.service";
import { SearchMediaDto } from "./dto/search-media.dto";
import { CachedSearchResult } from "@thmanyah/types";

@Controller("search-media")
export class SearchMediaController {
  constructor(private readonly searchMediaService: SearchMediaService) {}

  @Get()
  async search(
    @Query() query: SearchMediaDto
  ): Promise<Omit<CachedSearchResult, "id" | "createdAt">[]> {
    if (!query.term) {
      return await this.searchMediaService.getRecentPodcasts();
    }

    if (!query.term || query.term.trim().length === 0) {
      throw new BadRequestException("Search term is required");
    }

    if (query.limit && (query.limit < 1 || query.limit > 200)) {
      throw new BadRequestException("Limit must be between 1 and 200");
    }

    const searchParams = {
      term: query.term.trim(),
      limit: query.limit || 50,
      country: query.country || "US",
    };

    try {
      return await this.searchMediaService.search(searchParams);
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : "Internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get(":id")
  async getPodcastById(@Param("id") id: string) {
    const recordId = parseInt(id);

    if (isNaN(recordId)) {
      throw new BadRequestException("Invalid podcast ID - must be a number");
    }

    try {
      return await this.searchMediaService.getPodcastById(recordId);
    } catch (error) {
      throw new HttpException(
        error instanceof Error ? error.message : "Internal server error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
