import { useState } from "react";
import { useMapStore } from "../../stores/mapStore";

interface SearchResult {
  item: {
    type: "industry" | "role";
    slug: string;
    name: string;
    color?: string;
    industrySlug?: string;
  };
}

interface Props {
  results: SearchResult[];
}

export function SearchResults({ results }: Props) {
  const { focusIndustry, selectRole } = useMapStore();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (result: SearchResult["item"]) => {
    if (result.type === "industry") {
      focusIndustry(result.slug);
      return;
    }

    selectRole(result.slug);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => Math.min(current + 1, results.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
    }

    if (event.key === "Enter" && results[activeIndex]) {
      handleSelect(results[activeIndex].item);
    }
  };

  return (
    <div
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="absolute left-0 right-0 top-full z-30 mt-1 overflow-hidden rounded-2xl border border-border/85 bg-card shadow-[0_10px_26px_rgba(67,40,17,0.12)]"
    >
      {results.map((result, index) => (
        <button
          key={`${result.item.type}-${result.item.slug}`}
          onClick={() => handleSelect(result.item)}
          className={`flex w-full items-center gap-3 border-b border-border/80 px-3 py-2 text-left last:border-b-0 ${
            index === activeIndex ? "bg-[#fff2e1]" : "bg-card"
          }`}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: result.item.color ?? "var(--accent-primary)" }}
          />
          <span>
            <span className="block text-sm font-semibold text-[#1a2740]">{result.item.name}</span>
            <span className="block text-[11px] uppercase tracking-[0.12em] text-[#8d7258]">
              {result.item.type}
            </span>
          </span>
        </button>
      ))}
    </div>
  );
}
