import blackLogo from "../assets/blacklogo.svg";
import { useTime } from "../context/timeContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
const DigitalTimer = () => {
  const { clear } = useTime();
  const endTime = sessionStorage.getItem("endTime");
  const paus = sessionStorage.getItem("paus");

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
      if (paus == "true") {
        console.log(typeof paus, paus);
        const now = new Date();
        now.setMinutes(now.getMinutes() + 5);
        sessionStorage.setItem("pausEnd", now.toISOString());
        sessionStorage.removeItem("startTime");
        sessionStorage.removeItem("endTime");
        navigate("/break");
      } else {
        clear();
        navigate("/alarm");
      }
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
    sessionStorage.removeItem("pausEnd");
    navigate("/settimer");
  };

  return (
    <div className="brightStyle wrapper digitalWrapper">
      <header className="header">
        {" "}
        <Link to="/menu">
          <img src={blackLogo} alt="logo" />
        </Link>
        <p>interval</p>
      </header>
      <section className="timeSection">
        <h1>
          {timeLeft.minutes ? String(timeLeft.minutes).padStart(2, "0") : "00"}:
          {timeLeft.seconds ? String(timeLeft.seconds).padStart(2, "0") : "00"}
        </h1>
      </section>
      <button onClick={() => handleAbort()} className="opacityBtn">
        ABORT TIMER
      </button>
    </div>
  );
};

export default DigitalTimer;
