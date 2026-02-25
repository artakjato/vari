import { Link } from "react-router-dom";
import { useMapStore } from "../stores/mapStore";

import { Breadcrumbs } from "../components/map/Breadcrumbs";
import { MapCanvas } from "../components/map/MapCanvas";
import { InspectorPanel } from "../components/panels/InspectorPanel";
import { SearchBar } from "../components/search/SearchBar";
import { useMapNavigation } from "../hooks/useMapNavigation";
import { Skeleton } from "../components/ui/Skeleton";

export function MapPage() {
  useMapNavigation();
  const currentUser = useMapStore((s) => s.currentUser);
  const loading = useMapStore((s) => s.loading);
  const error = useMapStore((s) => s.error);

  if (loading) {
    return (
      <div style={{ display: "flex", gap: 24, padding: 40 }}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} width={120} height={120} radius={60} />
        ))}
      </div>
    );
  }

  if (error) {
    return <p style={{ color: "red", padding: 32 }}>{error}</p>;
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <div style={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
        {currentUser ? (
          <span style={{ fontFamily: "Outfit" }}>
            User: {currentUser.displayName}
          </span>
        ) : (
          <Link to="/auth">
            <button>Sign in</button>
          </Link>
        )}
      </div>

      <MapCanvas />
      <Breadcrumbs />
      <SearchBar />
      <InspectorPanel />
    </div>
  );
}
