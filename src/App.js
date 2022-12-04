import { useState, useRef } from "react";

import Timer from "./components/Timer";
import "./App.css";
import SettingsContext from "./store/settings-context";

// Initial Variables
const workTime = 25;
const shortBreakTime = 5;
const longBreakTime = 15;

function App() {
  const [session, setSession] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(shortBreakTime);
  const [reset, setReset] = useState(false);
  const [mode, setMode] = useState("work");

  const isPausedRef = useRef(true);

  // setIsPaused(isPausedRef.current);

  return (
    <main>
      <SettingsContext.Provider
        value={{
          session,
          setSession,
          mode,
          setMode,
          workMinutes: workTime,
          shortBreakTime,
          longBreakTime,
          breakMinutes,
          setBreakMinutes,
          isPausedRef,
          reset,
          setReset,
        }}
      >
        <Timer />
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
