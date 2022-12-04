import { useState, useEffect, useContext } from "react";

import SettingsContext from "../store/settings-context";
import "./Sessions.css";

function Sessions(props) {
  const settingsInfo = useContext(SettingsContext);
  const [message, setMessage] = useState("Focus!");

  useEffect(() => {
    if (props.mode === "break") {
      //Increase session count
      settingsInfo.setSession(settingsInfo.session + 1);

      //Set long break after 4th pomodoro
      if ((settingsInfo.session + 1) % 4 === 0) {
        settingsInfo.setBreakMinutes(settingsInfo.longBreakTime);
        setMessage("Relax...");
      } else {
        settingsInfo.setBreakMinutes(settingsInfo.shortBreakTime);
        setMessage("Take a break!");
      }
    } else {
      setMessage("Focus!");
    }
  }, [props.mode, SettingsContext.session]);

  return (
    <div>
      <p className="sessions">Pomodoros: {settingsInfo.session}</p>
      <p className="message">{message}</p>
    </div>
  );
}

export default Sessions;
