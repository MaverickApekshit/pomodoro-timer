import { useState, useRef, useEffect } from "react";

function Sessions(props) {
  const [sessions, setSessions] = useState(0);
  const sessionsRef = useRef(sessions);

  useEffect(() => {
    if (props.mode === "break") {
      sessionsRef.current++;
      setSessions(sessionsRef.current);
      // if (sessionsRef.current % 4 === 0) {
      //   breakMinutes = 15;
      // } else {
      //   breakMinutes = 5;
      // }
    }
  }, [props.mode]);

  return (
    <div className="sessions">
      <p>Pomodoros: {sessions}</p>
    </div>
  );
}

export default Sessions;
