import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Iniciocmp from './Iniciocmp';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Iniciocmp />} />
      </Routes>
    </Router>
  );
}

export default App;
