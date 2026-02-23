import { useMapStore } from "../../stores/mapStore";

export function Breadcrumbs() {
  const { breadcrumbs, resetMap, focusIndustry } = useMapStore();

  return (
    <div
      style={{
        position: "absolute",
        top: 16,
        left: 16,
        display: "flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "Outfit",
        fontSize: 14,
      }}
    >
      {breadcrumbs.map((crumb, index) => (
        <span
          key={crumb}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          {index > 0 && (
            <span style={{ color: "var(--text-secondary)" }}>›</span>
          )}
          <button
            onClick={() => {
              if (index === 0) resetMap();
              else if (index === 1) focusIndustry(crumb);
              // district level: add focusDistrict(crumb)
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color:
                index === breadcrumbs.length - 1
                  ? "var(--accent-primary)" // current level = orange
                  : "var(--text-secondary)", // parent levels = grey
            }}
          >
            {crumb}
          </button>
        </span>
      ))}
    </div>
  );
}
