import { useState, useEffect, useContext } from "react";

import SettingsContext from "../store/settings-context";
import "./Sessions.css";

function Sessions(props) {
  const settingsInfo = useContext(SettingsContext);

  const [sessions, setSessions] = useState(0);
  const [message, setMessage] = useState("Focus!");

  useEffect(() => {
    if (props.mode === "break") {
      //Increase session count
      setSessions(sessions + 1);

      //Set long break after 4th pomodoro
      if ((sessions + 1) % 4 === 0) {
        settingsInfo.setBreakMinutes(settingsInfo.longBreakTime);
        setMessage("Relax...");
      } else {
        settingsInfo.setBreakMinutes(settingsInfo.shortBreakTime);
        setMessage("Take a break!");
      }
    } else {
      setMessage("Focus!");
    }
  }, [props.mode]);

  return (
    <div>
      <p className="sessions">Pomodoros: {sessions}</p>
      <p className="message">{message}</p>
    </div>
  );
}

export default Sessions;
