// src/App.js
import React from "react";
import "./App.css";
import Header from "./components/header"; // ✅ This is your Header component

import Register from "./pages/Register"; // ✅ Make sure this matches file and function name
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import "./App.css";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Header /> {/* ✅ Use Header component, not <header/> */}
        <Routes>
          <Route
            path="/"
            element={<Home/>} />
          <Route path="/register" element={<Register />} />

          <Route path="/login" element={<Login />} />

          
        </Routes>

      </Router>
    </div>
  );
}

export default App;
