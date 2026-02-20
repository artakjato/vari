import { MapCanvas } from "../components/map/MapCanvas";

export function MapPage() {
  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <MapCanvas />
      {/* Search bar and inspector panel will be added here in later days */}
    </div>
  );
}
