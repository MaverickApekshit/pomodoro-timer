import { useState, useRef } from "react";

import Timer from "./components/Timer";
import "./App.css";
import SettingsContext from "./store/settings-context";

// Initial Variables
const workTime = 25;
const shortBreakTime = 5;
const longBreakTime = 15;

function App() {
  const [breakMinutes, setBreakMinutes] = useState(shortBreakTime);
  const [reset, setReset] = useState(false);

  const isPausedRef = useRef(true);

  // setIsPaused(isPausedRef.current);

  return (
    <main>
      <SettingsContext.Provider
        value={{
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
