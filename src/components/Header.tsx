import logo from "../images/logo.png";
import "../styles/header.css";

const Header = () => {
  return (
    <div className="head">
      <figure className="figure">
        <img className="img" src={logo} alt="" />
      </figure>
    </div>
  );
};

export default Header;
