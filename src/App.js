import { useState } from "react";

import Timer from "./components/Timer";
import "./App.css";
import SettingsContext from "./store/settings-context";

function App() {
  return (
    <main>
      <Timer />
    </main>
  );
}

export default App;
