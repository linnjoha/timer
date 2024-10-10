import blackLogo from "../assets/blacklogo.svg";

import { useNavigate, Link } from "react-router-dom";
//redirect when submit to settimer
const AnalogTimer = () => {
  const navigate = useNavigate();
  const handleAbort = () => {
    navigate("/settimer");
  };
  return (
    <div className="brightStyle wrapper analogWrapper">
      <header className="header">
        {" "}
        <Link to="/menu">
          <img src={blackLogo} alt="logo" />
        </Link>
        <p>interval</p>
      </header>
      <section className="timeSection"></section>
      <button onClick={() => handleAbort()} className="opacityBtn">
        ABORT TIMER
      </button>
    </div>
  );
};

export default AnalogTimer;
