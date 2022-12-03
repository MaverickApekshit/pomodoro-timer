import { useState, useEffect, useRef } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import Sessions from "./Sessions";
import PlayButton from "./PlayButton";
import PauseButton from "./PauseButton";

import "./Timer.css";

// Initial Variables
const workMinutes = 25;
let breakMinutes = 5;
const workColor = "#f54e4e";
const breakColor = "#4aec8c";

function Timer() {
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("work");
  const [isPaused, setIsPaused] = useState(true);

  const secondsLeftRef = useRef(secondsLeft);
  const modeRef = useRef(mode);
  const isPausedRef = useRef(isPaused);

  // Switch between work and break mode
  function switchMode() {
    const nextMode = modeRef.current === "work" ? "break" : "work";

    let nextSeconds = (nextMode === "work" ? workMinutes : breakMinutes) * 60;

    // Switch mode
    setMode(nextMode);
    modeRef.current = nextMode;

    // Switch time to work/break time
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  // Reduce the time
  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    secondsLeftRef.current = workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const totalSeconds = mode === "work" ? workMinutes * 60 : breakMinutes * 60;

  //Calculate the percentage for loading bar
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  //Calculete minutes and seconds for displaying the time
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds += "0";

  return (
    <div className="container">
      <Sessions mode={mode} />

      <CircularProgressbar
        value={percentage}
        text={`${minutes}:${seconds}`}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "work" ? workColor : breakColor,
          tailColor: "rgba(255, 255, 255, 0.2)",
        })}
      />
      <div style={{ marginTop: "20px" }}>
        {isPaused ? (
          <PlayButton
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <PauseButton
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Timer;
