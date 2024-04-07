import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Pagination from "../components/Pagination";

const Characters = () => {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const userToken = Cookies.get("userToken");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--9x82jlrpnwgd.code.run/characters?page=${page}&name=${search}`
        );

        setCharacters(response.data.results);

        setTotalPages(Math.ceil(response.data.count / 100));

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacters();
  }, [page, search]);

  const handleFavoriteToggle = async (characterId) => {
    if (!userToken) {
      toast.error("Veuillez vous connecter pour gérer vos favoris.");
      return;
    }
    try {
      const response = await axios.post(
        `https://site--backend-marvel--9x82jlrpnwgd.code.run/user/favorites/characters`,
        { characterId },
        { headers: { Authorization: `Bearer ${userToken}` } }
      );

      toast.success(response.data.message);
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la modification des favoris");
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return isLoading ? (
    <p>En cours de chargement...</p>
  ) : (
    <>
      <ToastContainer />
      <main className="characters-main">
        <div className="container">
          <div className="hero">
            <h2>PERSONNAGES</h2>
          </div>
          <div className="characters-container">
            <div>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher..."
              />
            </div>
            <div className="characters-sheet">
              {characters.map((character) => {
                return (
                  <div key={character._id} className="character-card">
                    <Link to={`/character/${character._id}`}>
                      <div className="character-img">
                        <img
                          src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                          alt=""
                        />
                      </div>
                    </Link>
                    <div className="character-info">
                      <h2>{character.name}</h2>

                      <button
                        onClick={() => handleFavoriteToggle(character._id)}
                      >
                        Ajouter aux favoris
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pagination-container">
              <Pagination
                page={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Characters;
