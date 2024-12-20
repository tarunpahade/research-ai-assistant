import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PaperViewPage } from './pages/PaperViewPage';
//import GeneratePage from './components/generate/generate';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/paper/:paperId" element={<PaperViewPage />} />
        {/* <Route path="/draft" element={<GeneratePage />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;