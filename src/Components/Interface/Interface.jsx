import React from "react";
import "./Interface.css";
import { useKeyboardControls } from "@react-three/drei";

function Interface() {
  const forword = useKeyboardControls((state) => state.forword);
  const backword = useKeyboardControls((state) => state.backword);
  const leftword = useKeyboardControls((state) => state.leftword);
  const rightword = useKeyboardControls((state) => state.rightword);
  const jump = useKeyboardControls((state) => state.jump);

  return (
    <div className="interface">
      {/* Time */}
      <div className="time">0.00</div>

      {/* Restart */}
      <div className="restart">Restart</div>

      {/* Controls */}
      <div className="controls">
        <div className="raw">
          <div className={forword ? `key active` : `key`}></div>
        </div>
        <div className="raw">
          <div className={leftword ? `key active` : `key`}></div>
          <div className={backword ? `key active` : `key`}></div>
          <div className={rightword ? `key active` : `key`}></div>
        </div>
        <div className="raw">
          <div className={jump ? `key large active` : `key large`}></div>
        </div>
      </div>
    </div>
  );
}

export default Interface;
