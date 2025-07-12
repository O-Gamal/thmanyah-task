import React from "react";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";
import Parser from "rss-parser";
import Link from "next/link";
import { RssIcon, LinkIcon, ArrowLeftIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Feed = ({
  feed,
}: {
  feed: {
    [key: string]: any;
  } & Parser.Output<{
    [key: string]: any;
  }>;
}) => {
  const latestEpisode = feed.items[0];
  const remainingEpisodes = feed.items.slice(1);

  return (
    <main className="container mx-auto max-w-screen-lg px-4 min-h-screen pt-10">
      <section className="py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between w-full gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2 max-w-xl">
              <h1 className="text-xl md:text-2xl font-bold text-right">
                {feed.title}
              </h1>
              <div className="flex items-center gap-4">
                <Link
                  href={feed.feedUrl || "#"}
                  target="_blank"
                  title="RSS Feed"
                >
                  <RssIcon className="w-5 h-5" />
                </Link>
                {feed.link && (
                  <Link href={feed.link} target="_blank" title="Visit Website">
                    <LinkIcon className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>

            {feed.creator && (
              <p className="md:text-lg text-gray-600 mb-4 text-right">
                بواسطة: {feed.creator}
              </p>
            )}

            {feed.description && (
              <div
                className="text-gray-600 text-right leading-relaxed max-w-lg mb-4"
                dangerouslySetInnerHTML={{ __html: feed.description }}
              />
            )}

            <div className="flex flex-col md:flex-row md:items-center md:gap-3 text-sm text-gray-500">
              {feed.language && <span>اللغة: {feed.language}</span>}
              <span className="hidden md:block">•</span>
              {feed.items && <span>عدد الحلقات: {feed.items.length}</span>}
              <span className="hidden md:block">•</span>
              {feed.copyright && <span>{feed.copyright}</span>}
            </div>
          </div>
          <Button
            variant="outline"
            className="mb-5 order-first md:order-last"
            asChild
          >
            <Link href="/">
              <HomeIcon className="w-4 h-4 ml-1" />
              <span>الرئيسية</span>
            </Link>
          </Button>
        </div>
      </section>

      {/* Latest Episode Section */}
      {latestEpisode && (
        <section className="py-8">
          <article className="p-5 border-y">
            <div className="flex gap-6 md:items-center flex-col md:flex-row">
              <div className="w-full sm:w-56 aspect-square relative rounded-xl overflow-hidden flex-shrink-0">
                <img
                  src={latestEpisode.itunes?.image || ""}
                  alt={latestEpisode.title || ""}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-right">
                      {latestEpisode.title}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                      {latestEpisode.pubDate && (
                        <time>
                          {formatDistanceToNow(
                            new Date(latestEpisode.pubDate),
                            {
                              addSuffix: true,
                              locale: ar,
                            }
                          )}
                        </time>
                      )}
                      <span>•</span>
                      {latestEpisode.itunes?.duration && (
                        <span>{latestEpisode.itunes.duration}</span>
                      )}
                    </div>
                  </div>
                </div>

                {latestEpisode.contentSnippet && (
                  <p className="text-gray-600 text-sm text-right mb-6 leading-relaxed">
                    {latestEpisode.contentSnippet.slice(0, 300)}
                    {latestEpisode.contentSnippet.length > 300 && "..."}
                  </p>
                )}
                <div className="">
                  <Link
                    href={latestEpisode.link || ""}
                    target="_blank"
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 px-6"
                  >
                    استمع للحلقة
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Remaining Episodes Grid */}
      {remainingEpisodes.length > 0 && (
        <section className="py-8">
          <h2 className="text-xl font-bold mb-5">الحلقات السابقة</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {remainingEpisodes.map((episode) => (
              <Link
                href={episode.link || ""}
                key={episode.guid}
                className="group"
                target="_blank"
              >
                <article className="relative aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={episode.itunes?.image || ""}
                    alt={episode.title || ""}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 p-4 text-white">
                    <h3 className="text-sm font-medium line-clamp-2 text-right">
                      {episode.title}
                    </h3>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};
