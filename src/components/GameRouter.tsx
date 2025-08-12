import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import your games here
import ColourQuest from "../games/colour-quest";
// import CardBattle from "../games/card-battle";
// import HoopShoot from "../games/hoop-shoot";
// import IsometricCity from "../games/isometric-city";
// import MultiplyDefence from "../games/multiply-defence";
// import SpaceDefenders from "../games/space-defenders";
// import SpaceRunner from "../games/space-runner";
// import SushiShop from "../games/sushi-shop";

const GameRouter: React.FC = () => {
  return (
    <div className="game-container">
      <Routes>
        <Route path="colour-quest" element={<ColourQuest />} />
        {/* Add other games as you migrate them */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default GameRouter;
