import { useState } from "react";

import Timer from "./components/Timer";
import "./App.css";
import SettingsContext from "./store/settings-context";

// Initial Variables
const workTime = 25;
const breakTime = 5;
const workColor = "#f54e4e";
const breakColor = "#4aec8c";

function App() {
  const [breakMinutes, setBreakMinutes] = useState(breakTime);

  return (
    <main>
      <SettingsContext.Provider
        value={{
          workMinutes: workTime,
          breakMinutes,
          setBreakMinutes,
          workColor,
          breakColor,
        }}
      >
        <Timer />
      </SettingsContext.Provider>
    </main>
  );
}

export default App;
