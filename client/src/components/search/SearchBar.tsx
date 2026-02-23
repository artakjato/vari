import { Search } from "lucide-react";
import { useSearch } from "../../hooks/useSearch";
import { SearchResults } from "./SearchResults";

export function SearchBar() {
  const { query, setQuery, results } = useSearch();

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "var(--bg-surface)",
          border: "1px solid var(--border-subtle)",
          borderRadius: 24,
          padding: "8px 16px",
          gap: 8,
        }}
      >
        <Search size={16} color="var(--text-secondary)" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search roles and industries..."
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            fontFamily: "Inter",
            width: 240,
          }}
        />
      </div>
      {results.length > 0 && <SearchResults results={results} />}
    </div>
  );
}
