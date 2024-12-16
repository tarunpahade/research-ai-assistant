import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { PaperViewPage } from './pages/PaperViewPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/paper/:paperId" element={<PaperViewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;