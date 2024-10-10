import blackLogo from "../assets/blacklogo.svg";
import Menu from "../components/Menu";
import { redirect } from "react-router-dom";
//redirect when submit to settimer
const AnalogTimer = () => {
  return (
    <div className="brightStyle wrapper analogWrapper">
      <header className="header">
        {" "}
        <img src={blackLogo} alt="logo" />
        <dialog>
          <Menu />
        </dialog>
        <p>interval</p>
      </header>
      <section className="timeSection"></section>
      <button className="opacityBtn">ABORT TIMER</button>
    </div>
  );
};

export default AnalogTimer;
