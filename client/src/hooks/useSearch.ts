import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import type { Industry, Role } from "../lib/types";
import { useMapStore } from "../stores/mapStore";

export type SearchItem =
  | (Industry & { type: "industry" })
  | (Role & { type: "role" });

export function useSearch() {
  const [query, setQuery] = useState("");
  const industries = useMapStore((state) => state.industries);
  const roles = useMapStore((state) => state.roles);

  const searchItems = useMemo<SearchItem[]>(() => [
    ...industries.map((industry) => ({ type: "industry" as const, ...industry })),
    ...roles.map((role) => ({ type: "role" as const, ...role })),
  ], [industries, roles]);

  const fuse = useMemo(() => new Fuse(searchItems, {
    keys: ["name", "description", "slug"],
    threshold: 0.32,
  }), [searchItems]);

  const results = useMemo(
    () => (query.trim().length > 1 ? fuse.search(query).slice(0, 8) : []),
    [query, fuse],
  );

  const matchedIndustrySlugs = useMemo(() => {
    if (!query.trim()) return [];

    const slugs = new Set<string>();

    for (const result of results) {
      if (result.item.type === "industry") {
        slugs.add(result.item.slug);
      } else {
        slugs.add(result.item.industrySlug);
      }
    }

    return [...slugs];
  }, [query, results]);

  return { query, setQuery, results, matchedIndustrySlugs };
}