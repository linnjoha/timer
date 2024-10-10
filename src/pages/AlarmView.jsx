import React from "react";
import { Link } from "react-router-dom";
import alarm from "../assets/alarm.svg";
const AlarmView = () => {
  return (
    <div className="wrapper darkStlye alarmView ">
      <div className="alarmSection">
        <div className="imgContainer">
          <img src={alarm} alt="" />
        </div>
        <h3>Times up!</h3>
      </div>
      <Link to="/settimer">
        <button>SET NEW TIMER</button>
      </Link>
    </div>
  );
};

export default AlarmView;
