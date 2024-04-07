import { Link } from "react-router-dom";
import logo from "../assets/img/langfr-1920px-MarvelLogo.svg_uw9pi8.png";

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="first-section">
          <Link to={"/"}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <div className="divider"></div>
        <div className="made-by">
          {" "}
          <span>Made with </span>
          <a target="blank" href="https://fr.reactjs.org/">
            React
          </a>
          <span> at </span>
          <a target="blank" href="https://www.lereacteur.io/">
            Le Reacteur
          </a>
          <span> by </span>
          <a target="blank" href="https://github.com/MohaDby">
            Mohamed
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
