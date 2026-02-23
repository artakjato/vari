import Fuse from "fuse.js";
import { useMemo, useState } from "react";
import { seedData } from "../data/seedData";

const searchItems = [
  ...seedData.industries.map((i) => ({ type: "industry" as const, ...i })),
  ...seedData.roles.map((r) => ({ type: "role" as const, ...r })),
];

const fuse = new Fuse(searchItems, {
  keys: ["name", "description", "slug"],
  threshold: 0.3, // 0 = exact match only, 1 = match everything
});

export function useSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(
    () => (query.length > 1 ? fuse.search(query).slice(0, 6) : []),
    [query],
  );
  return { query, setQuery, results };
}
