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
              <div className="welcome-screen">Welcome to the Arcade!</div>
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
