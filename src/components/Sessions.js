import { useState, useRef, useEffect, useContext } from "react";

import SettingsContext from "../store/settings-context";
import "./Sessions.css";

function Sessions(props) {
  const settingsInfo = useContext(SettingsContext);

  const [sessions, setSessions] = useState(0);
  const sessionsRef = useRef(sessions);

  useEffect(() => {
    if (props.mode === "break") {
      sessionsRef.current++;
      setSessions(sessionsRef.current);
      if (sessionsRef.current % 4 === 0) {
        settingsInfo.setBreakMinutes(15);
      } else {
        settingsInfo.setBreakMinutes(5);
      }
    }
  }, [props.mode]);

  return (
    <div className="sessions">
      <p>Pomodoros: {sessions}</p>
    </div>
  );
}

export default Sessions;
