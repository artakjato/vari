import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthPage } from "./pages/AuthPage";
import { MapPage } from "./pages/MapPage";
import { PinsPage } from "./pages/PinsPage";
import { StyleGuide } from "./pages/StyleGuide";

import { useEffect } from "react";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";
import { HomePage } from "./pages/HomePage";
import { useMapStore } from "./stores/mapStore";

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
