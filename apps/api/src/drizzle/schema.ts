import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  jsonb,
  index,
  unique,
} from "drizzle-orm/pg-core";

export const searchMedia = pgTable(
  "search_media",
  {
    id: serial("id").primaryKey(),
    collectionId: integer("collection_id").notNull(),
    artistName: text("artist_name").notNull(),
    collectionName: text("collection_name").notNull(),
    artworkUrl: text("artwork_url"),
    feedUrl: text("feed_url"),
    primaryGenreName: text("primary_genre_name"),
    rawData: jsonb("raw_data").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => {
    return {
      // Indexes
      collectionIdIdx: index("collection_id_idx").on(table.collectionId),
      artistNameIdx: index("artist_name_idx").on(table.artistName),
      createdAtIdx: index("created_at_idx").on(table.createdAt),

      uniqueCollectionPerSearch: unique("unique_collection_per_search").on(
        table.collectionId
      ),
    };
  }
);
