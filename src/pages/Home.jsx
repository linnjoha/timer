import logo from "../assets/logo.svg";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="homeWrapper displayFlexColumn darkStlye">
      <Link to="/settimer">
        <img src={logo} alt="logo" />
      </Link>
      <h2>INTERVAL</h2>
      <p>For all your timing needs</p>
    </div>
  );
};

export default Home;
