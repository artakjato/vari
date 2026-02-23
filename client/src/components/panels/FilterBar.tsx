import { useState } from "react";

// The filter categories shown as tabs
const FILTERS = ["All", "Work Patterns", "Roles", "Languages"] as const;

interface Props {
  onFilterChange: (filter: string) => void; // callback when a tab is clicked
}

export function FilterBar({ onFilterChange }: Props) {
  const [active, setActive] = useState("All");

  const handleClick = (filter: string) => {
    setActive(filter);
    onFilterChange(filter);
  };

  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        borderBottom: "1px solid var(--border-subtle)",
        marginBottom: 16,
      }}
    >
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => handleClick(filter)}
          style={{
            padding: "8px 16px",
            border: "none",
            background: "none",
            cursor: "pointer",
            fontFamily: "Inter",
            fontSize: 13,
            fontWeight: active === filter ? 600 : 400,
            color:
              active === filter
                ? "var(--accent-primary)"
                : "var(--text-secondary)",
            borderBottom:
              active === filter
                ? "2px solid var(--accent-primary)"
                : "2px solid transparent",
          }}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
