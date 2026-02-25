import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MapPage } from "./pages/MapPage";
import { StyleGuide } from "./pages/StyleGuide";
import { AuthPage } from "./pages/AuthPage";
import { PinsPage } from "./pages/PinsPage";

import { useEffect } from "react";
import { useMapStore } from "./stores/mapStore";
import { HomePage } from "./pages/HomePage";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";

function App() {
  const loadMapData = useMapStore((s) => s.loadMapData);

  useEffect(() => {
    loadMapData();
  }, [loadMapData]);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/map" element={<MapPage />} />
          <Route path="/style-guide" element={<StyleGuide />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/pins" element={<PinsPage />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
