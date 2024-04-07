import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = ({ handleToken }) => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://site--backend-marvel--9x82jlrpnwgd.code.run/user/signup",
        userData
      );
      handleToken(response.data.token);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      toast.error(error.response.data.message || "Une erreur est survenue.");
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="signup-main">
        <div className="container">
          <div className="col1"></div>
          <div className="col2">
            <h2>S'inscrire</h2>
            <p>
              "Devenez un héros de l'univers Marvel. Créez votre compte et
              forgez votre propre légende !
            </p>
            <form onSubmit={handleSubmit}>
              <input
                name="username"
                placeholder="Nom d'utilisateur"
                type="text"
                value={userData.username}
                onChange={handleChange}
                required
              />
              <input
                name="email"
                placeholder="Email"
                type="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
              <input
                name="password"
                placeholder="Mot de passe"
                type="password"
                value={userData.password}
                onChange={handleChange}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Chargement..." : "S'inscrire"}
              </button>
              <Link to={"/login"}>
                <p> Tu as déja un compte ? Connecte-toi !</p>
              </Link>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Signup;
