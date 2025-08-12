import React from "react";
import "./ArcadeCabinet.css";

interface ArcadeCabinetProps {
  children?: React.ReactNode;
}

const ArcadeCabinet: React.FC<ArcadeCabinetProps> = ({ children }) => {
  return (
    <div className="arcade-cabinet">
      <div className="cabinet-body">
        <div className="screen-area">
          <div className="screen">
            {children || (
              <div className="welcome-screen">
                <h1>Welcome to the Arcade!</h1>
                <p>Select a game to play:</p>
                <div className="game-list">
                  <a href="/games/colour-quest" className="game-link">
                    Colour Quest
                  </a>
                  {/* Add more game links as you migrate them */}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="control-panel">
          <div className="joystick-area">
            <div className="joystick"></div>
          </div>
          <div className="buttons">
            <button className="btn btn-primary">A</button>
            <button className="btn btn-primary">B</button>
            <button className="btn btn-secondary">Start</button>
            <button className="btn btn-secondary">Select</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArcadeCabinet;
