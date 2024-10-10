import React from "react";
import { Link, redirect } from "react-router-dom";
import paus from "../assets/paus.svg";
//redirect till digital om knappen trycks på
const BreakView = () => {
  return (
    <div className="wrapper darkStlye alarmView ">
      <div className="alarmSection">
        <div className="imgContainer">
          <img src={paus} alt="paus" />
        </div>
        <h3>Paus & breath</h3>
        <p>3:37</p>
      </div>
      <Link to="/digital">
        <button>NO PAUSE, GO NOW!</button>
      </Link>
    </div>
  );
};

export default BreakView;
