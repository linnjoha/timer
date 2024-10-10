import blackLogo from "../assets/blacklogo.svg";
import Menu from "../components/Menu";
import { useTime } from "../context/timeContext";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const DigitalTimer = () => {
  const { timeState, clear } = useTime();
  const endTime = sessionStorage.getItem("endTime");

  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({
    minutes: 0,
    seconds: 0,
  });

  const [startTime, setStartTime] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    setStartTime(new Date());
    setIsRunning(true);
  }, []);

  const calculateTimeLeft = () => {
    const now = new Date();
    const timeDifference = new Date(endTime) - now;

    if (timeDifference <= 0) {
      setIsRunning(false);
      clear();
      timeState.paus ? navigate("/break") : navigate("/alarm");
      return { minutes: 0, seconds: 0 };
    }

    const totalSeconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return { minutes, seconds };
  };

  useEffect(() => {
    if (isRunning && startTime) {
      const intervalId = setInterval(() => {
        setTimeLeft(calculateTimeLeft());
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isRunning, startTime]);

  const handleAbort = () => {
    clear();
    navigate("/settimer");
  };
  return (
    <div className="brightStyle wrapper digitalWrapper">
      <header className="header">
        {" "}
        <img src={blackLogo} alt="logo" />
        <dialog>
          <Menu />
        </dialog>
        <p>interval</p>
      </header>
      <section className="timeSection">
        <h1>
          {String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </h1>
      </section>
      <button onClick={() => handleAbort()} className="opacityBtn">
        ABORT TIMER
      </button>
    </div>
  );
};

export default DigitalTimer;
