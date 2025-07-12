import { logo } from "@/app/assets";
import Image from "next/image";
import { SearchForm } from "./form";
import SearchResults from "./search-results";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ term?: string }>;
}) {
  const { term } = await searchParams;

  return (
    <main className="container mx-auto px-4 pt-16 md:pt-28">
      <div className="mb-24">
        <Image src={logo} alt="شعار ثمانية" width={100} priority />
      </div>
      <SearchForm />
      <SearchResults term={term} />
    </main>
  );
}
