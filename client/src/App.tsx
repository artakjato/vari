import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MapPage } from './pages/MapPage'; 
import { StyleGuide } from './pages/StyleGuide';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<div><h1>Vari</h1><p>Home page coming Day 6!</p></div>} />
      <Route path="/map" element={<MapPage />}/>
      <Route path="/style-guide" element={<StyleGuide />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App; 
