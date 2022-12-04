import { useState, useEffect, useRef, useContext } from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import SettingsContext from "../store/settings-context";
import Sessions from "./Sessions";
import ControlButtons from "./ControlButtons";

import "./Timer.css";

const workColor = "#f54e4e";
const breakColor = "#4aec8c";

function Timer() {
  const settingsInfo = useContext(SettingsContext);

  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("work");

  const secondsLeftRef = useRef(secondsLeft);
  const modeRef = useRef(mode);

  // Set break/work time
  function timeLeft(mode) {
    return (
      (mode === "work" ? settingsInfo.workMinutes : settingsInfo.breakMinutes) *
      60
    );
  }

  // Reduce the time
  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  // Switch between work and break mode
  function switchMode() {
    const nextMode = modeRef.current === "work" ? "break" : "work";

    const nextSeconds = timeLeft(nextMode);

    // Switch mode
    setMode(nextMode);
    modeRef.current = nextMode;

    // Switch time to work/break time
    setSecondsLeft(nextSeconds);
    secondsLeftRef.current = nextSeconds;
  }

  useEffect(() => {
    secondsLeftRef.current = timeLeft(mode);
    setSecondsLeft(secondsLeftRef.current);

    const interval = setInterval(() => {
      if (settingsInfo.isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(interval);
  }, [settingsInfo]);

  //Get total time
  const totalSeconds = timeLeft(mode);

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

      <ControlButtons />
    </div>
  );
}

export default Timer;
