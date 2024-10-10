import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import AnalogTimer from "./pages/AnalogTimer";
import AlarmView from "./pages/AlarmView";
import BreakView from "./pages/BreakView";
import SetTimer from "./pages/SetTimer";
import DigitalTimer from "./pages/DigitalTimer";
import Menu from "./components/Menu";
import { TimeProvider } from "./context/timeContext";

function App() {
  return (
    <>
      <TimeProvider>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/analog" element={<AnalogTimer />} />
          <Route path="/digital" element={<DigitalTimer />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/break" element={<BreakView />} />
          <Route path="/alarm" element={<AlarmView />} />
          <Route path="/settimer" element={<SetTimer />} />
        </Routes>
      </TimeProvider>
    </>
  );
}

export default App;
