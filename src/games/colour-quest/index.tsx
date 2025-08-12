import React from "react";
import { Link } from "react-router-dom";

const ColourQuest: React.FC = () => {
  return (
    <div className="game-page">
      <header className="game-header">
        <Link to="/" className="back-button">
          ← Back to Games
        </Link>
        <h2>Colour Quest</h2>
      </header>

      <div className="game-frame">
        <iframe
          src="/src/games/colour-quest/index.html"
          title="Colour Quest"
          width="100%"
          height="600px"
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default ColourQuest;
