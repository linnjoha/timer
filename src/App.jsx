import "./App.css";
import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home.jsx";
import AnalogTimer from "./pages/AnalogTimer.jsx";
import AlarmView from "./pages/AlarmView.jsx";
import BreakView from "./pages/BreakView.jsx";
import SetTimer from "./pages/SetTimer.jsx";
import DigitalTimer from "./pages/DigitalTimer.jsx";
import Menu from "./components/Menu.jsx";
import { TimeProvider } from "./context/timeContext.jsx";

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
