import { Link } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";

import logo from "../assets/img/langfr-1920px-MarvelLogo.svg_uw9pi8.png";

const Header = ({ token, handleToken }) => {
  return (
    <>
      <header>
        <div className="container">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
          <div className="header-menu">
            <Link to={"/"}>
              <p>Personnages</p>
            </Link>
            <Link to={"/comics"}>
              <p>Comics</p>
            </Link>
            {token && (
              <Link to={"/favorites"}>
                <p>Favoris</p>
              </Link>
            )}
          </div>
          <div className="header-connexion">
            {token ? (
              <>
                <button
                  className="logout-button"
                  onClick={() => {
                    handleToken(null);
                  }}
                >
                  Se déconnecter
                </button>
              </>
            ) : (
              <>
                <Link to={"/login"}>
                  <p>Se connecter</p>
                </Link>
                <Link to={"/signup"}>
                  <p>S'inscire</p>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
