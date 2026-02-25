import { Link } from 'react-router-dom';
import { useMapStore } from '../stores/mapStore';

import { Breadcrumbs } from "../components/map/Breadcrumbs";
import { MapCanvas } from "../components/map/MapCanvas";
import { InspectorPanel } from '../components/panels/InspectorPanel';
import { SearchBar } from '../components/search/SearchBar';
import { useMapNavigation } from "../hooks/useMapNavigation";

export function MapPage() {
  useMapNavigation();
   const currentUser = useMapStore(s => s.currentUser);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Top-right user / sign-in */}
      <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 10 }}>
        {currentUser ? (
          <span style={{ fontFamily: 'Outfit' }}>
            👤 {currentUser.displayName}
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