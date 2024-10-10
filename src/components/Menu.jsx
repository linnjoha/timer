import { Link } from "react-router-dom";
import whiteLogo from "../assets/whiteLogo.svg";
const Menu = () => {
  return (
    <div className="wrapper menuWrapper">
      <img src={whiteLogo} alt="logo" />
      <section className="linkSection">
        <Link to="/analog">ANALOG TIMER</Link>
        <Link to="/digital">DIGITAL TIMER</Link>
      </section>
    </div>
  );
};

export default Menu;
