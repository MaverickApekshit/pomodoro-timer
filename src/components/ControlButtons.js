import { useContext, useState } from "react";

import SettingsContext from "../store/settings-context";

import "./ControlButtons.css";

function ControlButtons() {
  const settingsInfo = useContext(SettingsContext);
  const [isPaused, setIsPaused] = useState(settingsInfo.isPausedRef.current);

  function onPlayHandler() {
    setIsPaused(false);
    settingsInfo.isPausedRef.current = false;
    settingsInfo.setReset(false);
  }

  function onPauseHandler() {
    setIsPaused(true);
    settingsInfo.isPausedRef.current = true;
  }

  function onResetHandler() {
    settingsInfo.setSession(0);
    settingsInfo.setMode("work");
    settingsInfo.setBreakMinutes(settingsInfo.shortBreakTime);
    settingsInfo.isPausedRef.current = true;
    setIsPaused(true);
    settingsInfo.setReset(true);
  }

  return (
    <div className="controls">
      {isPaused ? (
        // Play button
        <button onClick={onPlayHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm14.024-.983a1.125 1.125 0 010 1.966l-5.603 3.113A1.125 1.125 0 019 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      ) : (
        // Pause button
        <button onClick={onPauseHandler}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H9zm5.25 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-.75z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      )}
      {/* Reset button */}
      <button onClick={onResetHandler}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path
            fillRule="evenodd"
            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm6-2.438c0-.724.588-1.312 1.313-1.312h4.874c.725 0 1.313.588 1.313 1.313v4.874c0 .725-.588 1.313-1.313 1.313H9.564a1.312 1.312 0 01-1.313-1.313V9.564z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}

export default ControlButtons;
