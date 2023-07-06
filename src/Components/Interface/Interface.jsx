import React, { useEffect, useRef, useState } from "react";
import "./Interface.css";
import { useKeyboardControls } from "@react-three/drei";
import useGame from "../stores/useGame";
import { addEffect } from "@react-three/fiber";

function Interface() {
  const time = useRef(null);

  const [playing, setPlaying] = useState(false);

  const restart = useGame((state) => state.restart);
  const phase = useGame((state) => state.phase);

  const forword = useKeyboardControls((state) => state.forword);
  const backword = useKeyboardControls((state) => state.backword);
  const leftword = useKeyboardControls((state) => state.leftword);
  const rightword = useKeyboardControls((state) => state.rightword);
  const jump = useKeyboardControls((state) => state.jump);

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.key === "r" || event.key === "R") {
        handleRestart();
      }
    });
    const unsubscribeEffect = addEffect(() => {
      const state = useGame.getState();

      let elapsedTime = 0;

      if (state.phase === "playing") {
        setPlaying(true);
        elapsedTime = Date.now() - state.startTime;
      } else if (state.phase === "ended") {
        setPlaying(false);
        elapsedTime = state.endTime - state.startTime;

        if (
          parseFloat(localStorage.getItem("score")) >
          parseFloat((elapsedTime / 1000).toFixed(2))
        ) {
          console.log("saved");
          localStorage.setItem("score", (elapsedTime / 1000).toFixed(2));
        } else {
          if (!localStorage.getItem("score")) {
            localStorage.setItem("score", (elapsedTime / 1000).toFixed(2));
          }
        }
      }

      elapsedTime /= 1000;
      elapsedTime = elapsedTime.toFixed(2);

      if (time.current) {
        time.current.textContent = elapsedTime;
      }

      // console.log(
      //   parseFloat(localStorage.getItem("score")) < parseFloat(elapsedTime)
      // );
      // console.log(
      //   parseFloat(elapsedTime),
      //   parseFloat(localStorage.getItem("score"))
      // );
    });

    return () => {
      unsubscribeEffect();
    };
  }, []);

  function handleRestart() {
    setPlaying(false);
    restart();
  }

  return (
    <div className="interface">
      {/* menu */}

      <div className="menu flex">
        <div>click 'J' to turn ON/OFF graphics</div>
        <div>click 'R' to restart</div>
      </div>

      {/* Time */}
      <div className={playing ? "time playing_time" : "time"} ref={time}>
        0.00
      </div>
      <div className={playing ? "highScore playing_HS" : "highScore"}>
        High score: {localStorage.getItem("score")}
      </div>

      {/* Restart */}
      {phase === "ended" && (
        <div className="restart" onClick={handleRestart}>
          Restart
        </div>
      )}

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
