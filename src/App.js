import "./App.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logincmp from "./Logincmp";
import Iniciocmp from "./Iniciocmp";
import Usercmp from "./Usercmp";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<Usercmp />} />
        <Route path="/home" element={<Iniciocmp />} />
        <Route path="/" element={<Logincmp />} />
      </Routes>
    </Router>
  );
}

export default App;
