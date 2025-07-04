// src/App.jsx

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Lobby from "./components/Lobby";
import GameBoard from "./components/GameBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route
          path="/play"
          element={<Lobby />}
        />

        <Route
          path="/game/:gameId"
          element={<GameBoard />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
