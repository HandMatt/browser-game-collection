import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameHub from "./components/GameHub";
import GameRouter from "./components/GameRouter.tsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<GameHub />} />
        <Route path="/games/*" element={<GameRouter />} />
      </Routes>
    </Router>
  );
}

export default App;
