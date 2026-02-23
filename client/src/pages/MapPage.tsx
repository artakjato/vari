import { Breadcrumbs } from "../components/map/Breadcrumbs";
import { MapCanvas } from "../components/map/MapCanvas";
import { InspectorPanel } from '../components/panels/InspectorPanel';
import { useMapNavigation } from "../hooks/useMapNavigation";

export function MapPage() {
  useMapNavigation();
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <MapCanvas />
      <Breadcrumbs/>
      <InspectorPanel />
    </div>
  );
}
