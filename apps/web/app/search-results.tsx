import Image from "next/image";
import { CachedSearchResult } from "@thmanyah/types";
import { SearchResultsSkeleton } from "./search-results-skeleton";
import { search } from "@/server/api";
import { Suspense } from "react";
import Link from "next/link";

async function ResultsGrid({ term }: { term?: string }) {
  const data = await search(term);

  if (!data || !data.length) {
    return (
      <div className="mt-8 text-center text-gray-600">
        لم يتم العثور على نتائج
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="md:text-lg mb-4 text-accent-foreground">
        {term ? `نتائج البحث (${data.length})` : "بحثت عنه مؤخراً"}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {data.map((item: CachedSearchResult) => (
          <Link
            href={`/feed/${item.collectionId}`}
            key={item.collectionId}
            className="group overflow-hidden hover:bg-accent/50 rounded-[20px] transition-all duration-300"
          >
            <div className="relative overflow-hidden rounded-2xl mb-2 group-hover:scale-[0.98] transition-all duration-300 aspect-square">
              {item.artworkUrl && (
                <Image
                  src={item.artworkUrl}
                  alt={item.collectionName}
                  fill
                  className="object-cover"
                />
              )}
              {item.primaryGenreName && (
                <p className="text-xs bg-foreground backdrop-blur-sm text-background px-2 py-1 rounded-full absolute top-3 right-3">
                  {item.primaryGenreName}
                </p>
              )}
            </div>
            <div className="ps-2 pb-4">
              <h3 className="font-semibold mb-1">{item.collectionName}</h3>
              <p className="text-xs md:text-sm text-gray-600 line-clamp-2">
                {item.artistName}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default async function SearchResults({ term }: { term?: string }) {
  return (
    <div className="mt-8">
      <Suspense fallback={<SearchResultsSkeleton />}>
        <ResultsGrid term={term} />
      </Suspense>
    </div>
  );
}
