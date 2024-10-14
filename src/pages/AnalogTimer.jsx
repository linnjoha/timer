import { useTime } from "../context/timeContext";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import blackLogo from "../assets/blacklogo.svg";
import clock from "../assets/clock.svg";
import minutes from "../assets/minutes.svg";
import seconds from "../assets/secounds.svg";

const AnalogTimer = () => {
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
      if (paus === "true") {
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

  const getRotationStyles = () => {
    const { minutes, seconds } = timeLeft;

    const totalMinutes = 60;
    const minuteRotation = (minutes / totalMinutes) * 360;
    const secondRotation = (seconds / 60) * 360;

    return {
      minuteStyle: { transform: `rotate(${minuteRotation}deg)` },
      secondStyle: { transform: `rotate(${secondRotation}deg)` },
    };
  };

  const { minuteStyle, secondStyle } = getRotationStyles();

  return (
    <div className="brightStyle analogWrapper">
      <header className="header">
        <Link to="/menu">
          <img src={blackLogo} alt="logo" />
        </Link>
        <p>interval</p>
      </header>
      <div className=" ">
        <section className="clockSection">
          <div className="clockContainer">
            <img src={clock} alt="Clock Face" className="clockFace" />
            <img
              src={minutes}
              alt="Minute Hand"
              className="minuteHand"
              style={minuteStyle}
            />
            <img
              src={seconds}
              alt="Second Hand"
              className="secondHand"
              style={secondStyle}
            />
          </div>
        </section>

        <button onClick={() => handleAbort()} className="opacityBtn">
          ABORT TIMER
        </button>
      </div>
    </div>
  );
};

export default AnalogTimer;
