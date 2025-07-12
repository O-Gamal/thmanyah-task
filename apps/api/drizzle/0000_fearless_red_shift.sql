CREATE TABLE "search_media" (
	"id" serial PRIMARY KEY NOT NULL,
	"collection_id" integer NOT NULL,
	"search_term" text NOT NULL,
	"artist_name" text NOT NULL,
	"collection_name" text NOT NULL,
	"artwork_url" text,
	"feed_url" text,
	"primary_genre_name" text,
	"raw_data" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
