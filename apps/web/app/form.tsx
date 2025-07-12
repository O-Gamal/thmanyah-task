"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import { useDebounce } from "@/lib/hooks/use-debounce";
import { SearchIcon } from "lucide-react";

export const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState(searchParams.get("term") ?? "");
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms delay

  React.useEffect(() => {
    startTransition(() => {
      updateSearchParams(debouncedSearchTerm);
    });
  }, [debouncedSearchTerm]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const term = formData.get("search") as string;
    setSearchTerm(term);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const updateSearchParams = (term: string) => {
    const params = new URLSearchParams(searchParams);
    if (!term.trim()) {
      params.delete("term");
    } else {
      params.set("term", term);
    }
    router.replace(`?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <Input
          placeholder="ابحث هنا..."
          className="py-6 lg:w-2/3 text-lg lg:text-xl font-medium mb-24 transition-opacity duration-200 ps-12"
          name="search"
          value={searchTerm}
          onChange={handleChange}
        />
        <SearchIcon className="absolute scale-x-[-1] right-3 top-1/2 -translate-y-1/2 text-gray-500" />
      </div>
    </form>
  );
};
