import logo from "../images/logo.png";
import "../styles/header.css";

const Header = () => {
  return (
    <figure className="figure">
      <img className="img" src={logo} alt="" />
    </figure>
  );
};

export default Header;
