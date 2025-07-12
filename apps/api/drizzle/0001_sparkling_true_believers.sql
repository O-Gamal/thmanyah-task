CREATE INDEX "search_term_idx" ON "search_media" USING btree ("search_term");--> statement-breakpoint
CREATE INDEX "collection_id_idx" ON "search_media" USING btree ("collection_id");--> statement-breakpoint
CREATE INDEX "artist_name_idx" ON "search_media" USING btree ("artist_name");--> statement-breakpoint
CREATE INDEX "created_at_idx" ON "search_media" USING btree ("created_at");--> statement-breakpoint
ALTER TABLE "search_media" ADD CONSTRAINT "unique_collection_per_search" UNIQUE("collection_id","search_term");