ALTER TABLE "search_media" DROP CONSTRAINT "unique_collection_per_search";--> statement-breakpoint
DROP INDEX "search_term_idx";--> statement-breakpoint
ALTER TABLE "search_media" DROP COLUMN "search_term";--> statement-breakpoint
ALTER TABLE "search_media" ADD CONSTRAINT "unique_collection_per_search" UNIQUE("collection_id");