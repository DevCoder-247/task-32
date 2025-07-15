// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./components/AuthPage";
import DataPage from "./components/DataPage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/data"
          element={token ? <DataPage /> : <Navigate to="/auth" />}
        />
        <Route path="*" element={<Navigate to="/auth" />} />
      </Routes>
    </Router>
  );
}

export default App;
