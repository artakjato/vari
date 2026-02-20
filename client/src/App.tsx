import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StyleGuide } from './pages/StyleGuide';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<div><h1>Vari</h1></div>} />
      <Route path="/style-guide" element={<StyleGuide />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App; 
