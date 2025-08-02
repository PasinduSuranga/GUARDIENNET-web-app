// src/App.js
import React from "react";
import "./App.css";
import Header from "./components/header";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import ResetPassword from "./pages/ResetPassword";
import EnterEmail from './pages/EnterEmail';
import RenewPassword from './pages/RenewPassword';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Header />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<EnterEmail />} />
          <Route path="/reset-password/:token" element={<RenewPassword />} />
     
        </Routes>
      </div>
    </Router>
  );
}

export default App;
