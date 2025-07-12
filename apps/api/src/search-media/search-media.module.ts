import { Module } from "@nestjs/common";
import { SearchMediaService } from "./search-media.service";
import { SearchMediaController } from "./search-media.controller";
import { ItunesModule } from "../itunes/itunes.module";
import { DrizzleModule } from "../drizzle/drizzle.module";

@Module({
  imports: [ItunesModule, DrizzleModule],
  controllers: [SearchMediaController],
  providers: [SearchMediaService],
})
export class SearchMediaModule {}
