import { getPodcastById } from "@/server/api";
import Parser from "rss-parser";
import { Feed } from "./feed";

export default async function FeedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getPodcastById(parseInt(id));
  const parser = new Parser();
  const feed = await parser.parseURL(data.feedUrl);

  return <Feed feed={feed} />;
}
