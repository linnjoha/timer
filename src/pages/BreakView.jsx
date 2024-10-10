import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import paus from "../assets/paus.svg";
import { useTime } from "../context/timeContext";

const BreakView = () => {
  const endTime = sessionStorage.getItem("pausEnd");
  const savedMinutes = sessionStorage.getItem("minutes");
  const savedPaus = sessionStorage.getItem("paus");
  const { setTime, clear } = useTime();
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
      sessionStorage.removeItem("pausEnd");
      clear();
      const newEndTime = new Date();
      console.log("savedminutes", savedMinutes);
      newEndTime.setMinutes(newEndTime.getMinutes() + Number(savedMinutes));
      setTime(newEndTime.toISOString(), savedPaus, Number(savedMinutes));
      navigate("/digital");
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
    sessionStorage.removeItem("pausEnd");
    clear();
    console.log(typeof savedMinutes);
    const newEndTime = new Date();

    newEndTime.setMinutes(newEndTime.getMinutes() + Number(savedMinutes));
    console.log("newendtime", newEndTime);
    setTime(newEndTime, savedPaus, Number(savedMinutes));
    navigate("/digital");
  };

  return (
    <div className="wrapper darkStlye alarmView ">
      <div className="alarmSection">
        <div className="imgContainer">
          <img src={paus} alt="paus" />
        </div>
        <h3>Paus & breath</h3>
        <p>
          {" "}
          {String(timeLeft.minutes).padStart(2, "0")}:
          {String(timeLeft.seconds).padStart(2, "0")}
        </p>
      </div>

      <button onClick={() => handleAbort()}>NO PAUSE, GO NOW!</button>
    </div>
  );
};

export default BreakView;
