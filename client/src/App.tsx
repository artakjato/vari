import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MapPage } from './pages/MapPage'; 
import { StyleGuide } from './pages/StyleGuide';
import { AuthPage } from './pages/AuthPage'; 

import { useEffect } from 'react';
import { useMapStore } from './stores/mapStore';


function App() {
  const loadMapData = useMapStore(s => s.loadMapData);

  useEffect(() => {
    loadMapData();
  }, []);  // [] means run once on first render

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<div><h1>Vari</h1><p>Home page coming Day 6!</p></div>} />
      <Route path="/map" element={<MapPage />}/>
      <Route path="/style-guide" element={<StyleGuide />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App; 
