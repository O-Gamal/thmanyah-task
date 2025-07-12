import { Module } from "@nestjs/common";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { ConfigModule } from "@nestjs/config";
import { SearchMediaModule } from "./search-media/search-media.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    DrizzleModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SearchMediaModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
