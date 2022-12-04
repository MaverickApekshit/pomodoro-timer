import { useState, useRef } from "react";

import Timer from "./components/Timer";
import "./App.css";
import SettingsContext from "./store/settings-context";

// Initial Variables
const workTime = 25;
const breakTime = 5;

function App() {
  const [session, setSession] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(breakTime);
  const [reset, setReset] = useState(false);
  const isPausedRef = useRef(true);

  // setIsPaused(isPausedRef.current);

  return (
    <main>
      <SettingsContext.Provider
        value={{
          session,
          setSession,
          workMinutes: workTime,
          breakTime,
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
