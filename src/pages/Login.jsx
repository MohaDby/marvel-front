import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = ({ handleToken }) => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://site--backend-marvel--9x82jlrpnwgd.code.run/user/login",
        loginData
      );
      handleToken(response.data.token);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(
        error.response.data.message ||
          "Une erreur est survenue lors de la connexion."
      );
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="login-main">
        <div className="container">
          <div className="col1"></div>
          <div className="col2">
            <h2>Se connecter</h2>
            <p>
              Rejoignez la mission. Accédez à votre QG Marvel et connectez-vous
              pour participer à des aventures épiques !
            </p>
            <form onSubmit={handleSubmit}>
              <input
                name="email"
                placeholder="Email"
                type="email"
                value={loginData.email}
                onChange={handleChange}
                required
              />
              <input
                name="password"
                placeholder="Mot de passe"
                type="password"
                value={loginData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Connexion..." : "Se connecter"}
              </button>
              <Link to={"/signup"}>
                <p> Pas encore de compte ? Inscris-toi !</p>
              </Link>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
