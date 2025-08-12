import React from "react";
import { Link } from "react-router-dom";
import "./GameHub.css";

const games = [
  {
    id: "colour-quest",
    name: "Colour Quest",
    description: "Strategic pattern-matching puzzle game",
    image: "/game-thumbnails/colour-quest.png", // You can add thumbnails later
    color: "#4a7d8e",
  },
  {
    id: "card-battle",
    name: "Card Battle",
    description: "Strategic card-based combat",
    image: "/game-thumbnails/card-battle.png",
    color: "#8e4a7d",
  },
  {
    id: "hoop-shoot",
    name: "Hoop Shoot",
    description: "Basketball shooting challenge",
    image: "/game-thumbnails/hoop-shoot.png",
    color: "#7d8e4a",
  },
  {
    id: "isometric-city",
    name: "Isometric City",
    description: "City-building idle game",
    image: "/game-thumbnails/isometric-city.png",
    color: "#4a8e7d",
  },
  {
    id: "multiply-defence",
    name: "Multiply Defence",
    description: "Math-based defense game",
    image: "/game-thumbnails/multiply-defence.png",
    color: "#8e7d4a",
  },
  {
    id: "space-defenders",
    name: "Space Defenders",
    description: "Space shooter tower defence",
    image: "/game-thumbnails/space-defenders.png",
    color: "#4a4a8e",
  },
  {
    id: "space-runner",
    name: "Space Runner",
    description: "Endless runner in space",
    image: "/game-thumbnails/space-runner.png",
    color: "#8e4a4a",
  },
  {
    id: "sushi-shop",
    name: "Sushi Shop",
    description: "Restaurant management game",
    image: "/game-thumbnails/sushi-shop.png",
    color: "#7d4a8e",
  },
];

const GameHub: React.FC = () => {
  return (
    <div className="game-hub">
      <header className="hub-header">
        <h1>�� Game Collection</h1>
        <p>Select a game to play</p>
      </header>

      <div className="games-grid">
        {games.map((game) => (
          <Link
            key={game.id}
            to={`/games/${game.id}`}
            className="game-card"
            style={{ "--accent-color": game.color } as React.CSSProperties}
          >
            <div className="game-card-content">
              <div className="game-icon">
                {game.image ? (
                  <img src={game.image} alt={game.name} />
                ) : (
                  <div
                    className="game-placeholder"
                    style={{ backgroundColor: game.color }}
                  >
                    {game.name.charAt(0)}
                  </div>
                )}
              </div>
              <h3>{game.name}</h3>
              <p>{game.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameHub;
