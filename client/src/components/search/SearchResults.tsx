import { useState } from "react";
import { useMapStore } from "../../stores/mapStore";

//the results come from Fuse.js - each has a '.item' with the actual data
interface SearchResult {
  item: {
    type: "industry" | "role";
    slug: string;
    name: string;
    color?: string; // industries have a color
    industrySlug?: string; // roles have an industrySlug
  };
}

interface Props {
  results: SearchResult[];
}

export function SearchResults({ results }: Props) {
  const { focusIndustry, selectRole } = useMapStore();
  const [activeIndex, setActiveIndex] = useState(0); // keyboard selection

  const handleClick = (result: SearchResult["item"]) => {
    if (result.type === "industry") {
      focusIndustry(result.slug); // zoom into the industry on the map
    } else {
      selectRole(result.slug); // open the inspector panel for this role
    }
  };

  // Handle keyboard navigation (ArrowUp, ArrowDown, Enter)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      handleClick(results[activeIndex].item);
    }
  };

  return (
    <div
      onKeyDown={handleKeyDown}
      tabIndex={0} // makes this div focusable so it can receive keyboard events
      style={{
        position: "absolute",
        top: "100%", // appears directly below the search bar
        left: 0,
        right: 0,
        marginTop: 4,
        background: "var(--bg-surface)",
        border: "1px solid var(--border-subtle)",
        borderRadius: 12,
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.08)",
        overflow: "hidden",
      }}
    >
      {results.map((result, i) => (
        <div
          key={result.item.slug}
          onClick={() => handleClick(result.item)}
          style={{
            padding: "10px 16px",
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            background: i === activeIndex ? "var(--bg-primary)" : "transparent", // highlight active
            borderBottom:
              i < results.length - 1
                ? "1px solid var(--border-subtle)"
                : "none",
          }}
        >
          {/* Colored dot: shows the industry color */}
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: result.item.color || "var(--accent-primary)",
            }}
          />
          {/* Result name and type label */}
          <div>
            <div style={{ fontFamily: "Inter", fontSize: 13, fontWeight: 500 }}>
              {result.item.name}
            </div>
            <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>
              {result.item.type === "industry" ? "Industry" : "Role"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
