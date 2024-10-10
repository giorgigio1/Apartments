import { useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import "../styles/header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="head">
      <figure className="figure">
        <input
          type="image"
          className="img"
          src={logo}
          alt="logo"
          onClick={() => navigate("/")}
        />
      </figure>
    </div>
  );
};

export default Header;
