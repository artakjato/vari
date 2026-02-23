import { Breadcrumbs } from "../components/map/Breadcrumbs";
import { MapCanvas } from "../components/map/MapCanvas";
import { useMapNavigation } from "../hooks/useMapNavigation";

export function MapPage() {
  useMapNavigation();
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <MapCanvas />
      <Breadcrumbs/>
      {/* Search bar and inspector panel will be added here in later days */}
    </div>
  );
}
