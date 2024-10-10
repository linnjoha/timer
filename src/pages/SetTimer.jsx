import { useState } from "react";
import Menu from "../components/Menu";
import blackLogo from "../assets/blacklogo.svg";
import leftArrow from "../assets/leftArrow.svg";
import rightArrow from "../assets/rightArrow.svg";
import { useNavigate } from "react-router-dom";
import { useTime } from "../context/timeContext";

const SetTimer = () => {
  const { setTime, timeState } = useTime();

  const [paus, setPaus] = useState(false);
  const [interval, setInterval] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const navigate = useNavigate();
  const formHandler = (e) => {
    if (!minutes) {
      alert("you must have atleast one minute set");
      return;
    }
    e.preventDefault();

    const endTime = new Date();
    endTime.setMinutes(endTime.getMinutes() + minutes);
    console.log(" end, paus, minutes", endTime, paus, minutes);
    setTime(endTime.toISOString(), paus, minutes);
    console.log("timestate", timeState);
    navigate("/digital");
  };

  return (
    <div className="brightStyle wrapper">
      <img src={blackLogo} alt="logo" />
      <dialog>
        <Menu />
      </dialog>
      <div className="setTimerWrapper displayFlexColumn ">
        <section className="displayFlexColumn">
          <div className="displayFlexrow timeSection">
            <img
              onClick={
                minutes
                  ? () => setMinutes(minutes - 1)
                  : () => setMinutes(minutes)
              }
              src={leftArrow}
              alt="leftarrow"
            />
            <h1>{minutes}</h1>
            <img
              onClick={() => setMinutes(minutes + 1)}
              src={rightArrow}
              alt="rightarrrow"
            />
          </div>
          <p>minutes</p>
        </section>
        <section className="formSection displayFlexColumn">
          <form
            onSubmit={(e) => formHandler(e)}
            className="displayFlexColumn"
            action="submit"
          >
            <div>
              <input
                type="checkbox"
                id="intervals"
                name="intervals"
                disabled={paus ? true : false}
                onChange={() => setInterval(!interval)}
                value={interval}
              />
              <label htmlFor="intervals">intervals</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="break"
                name="break"
                disabled={interval ? true : false}
                onChange={() => setPaus(!paus)}
                value={paus}
              />
              <label htmlFor="break">5 min break / interval</label>
            </div>
            <button> START TIMER</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SetTimer;
