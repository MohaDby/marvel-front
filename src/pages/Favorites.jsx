import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

const Favorites = () => {
  const [favoriteCharacters, setFavoriteCharacters] = useState([]);
  const [favoriteComics, setFavoriteComics] = useState([]);

  const userToken = Cookies.get("userToken");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const [charactersResponse, comicsResponse] = await Promise.all([
          axios.get(
            "https://site--backend-marvel--9x82jlrpnwgd.code.run/user/favorites/characters",
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          ),

          axios.get(
            "https://site--backend-marvel--9x82jlrpnwgd.code.run/user/favorites/comics",
            {
              headers: { Authorization: `Bearer ${userToken}` },
            }
          ),
        ]);

        const charactersDetails = await Promise.all(
          charactersResponse.data.map(async (id) => {
            const response = await axios.get(
              `https://site--backend-marvel--9x82jlrpnwgd.code.run/character/${id}`,
              {
                headers: { Authorization: `Bearer ${userToken}` },
              }
            );
            return response.data;
          })
        );

        const comicsDetails = await Promise.all(
          comicsResponse.data.map(async (id) => {
            const response = await axios.get(
              `https://site--backend-marvel--9x82jlrpnwgd.code.run/comic/${id}`,
              {
                headers: { Authorization: `Bearer ${userToken}` },
              }
            );
            return response.data;
          })
        );

        setFavoriteCharacters(charactersDetails);
        setFavoriteComics(comicsDetails);
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de la récupération des favoris");
      }
    };

    if (userToken) {
      fetchFavorites();
    }
  }, [userToken]);

  const toggleFavorite = async (id, type) => {
    if (!userToken) {
      toast.error("Veuillez vous connecter pour gérer vos favoris.");
      return;
    }
    try {
      const response = await axios.post(
        `https://site--backend-marvel--9x82jlrpnwgd.code.run/user/favorites/${type}`,
        {
          [`${type === "characters" ? "characterId" : "comicId"}`]: id,
        },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      );

      if (response.data.action === "added") {
        toast(
          `Ajouté aux ${
            type === "characters" ? "personnages" : "comics"
          } favoris`
        );
      } else if (response.data.action === "removed") {
        toast(
          `Retiré des ${
            type === "characters" ? "personnages" : "comics"
          } favoris`
        );
        if (type === "characters") {
          setFavoriteCharacters((prev) =>
            prev.filter((item) => item._id !== id)
          );
        } else {
          setFavoriteComics((prev) => prev.filter((item) => item._id !== id));
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la modification des favoris");
    }
  };

  return !userToken ? (
    <div>
      <Navigate to={"/"} />
    </div>
  ) : (
    <>
      <ToastContainer />
      <main className="favorites-main">
        <div className="container">
          <div className="hero">
            <h2>FAVORIS</h2>
          </div>
          <div className="favorites-container">
            <h2>
              Personnages <span> Favoris</span>
            </h2>
            <div className="characters-sheet">
              {favoriteCharacters.map((character) => (
                <div key={character._id} className="character-card">
                  <div className="character-img">
                    <Link to={`/character/${character._id}`}>
                      <img
                        src={`${character.thumbnail.path}/portrait_uncanny.${character.thumbnail.extension}`}
                        alt={character.name}
                      />
                    </Link>
                  </div>
                  <div className="character-info">
                    <h3>{character.name}</h3>
                    <button
                      onClick={() =>
                        toggleFavorite(character._id, "characters")
                      }
                    >
                      Retirer des favoris
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <h2>
              Comics <span> Favoris</span>
            </h2>
            <div className="comics-sheet">
              {favoriteComics.map((comic) => (
                <div key={comic._id} className="comic-card">
                  <div className="comic-img">
                    <img
                      src={`${comic.thumbnail.path}/portrait_uncanny.${comic.thumbnail.extension}`}
                      alt=""
                    />
                    {comic.description && (
                      <p className="hover-text">{comic.description}</p>
                    )}
                  </div>

                  <div className="comic-infos">
                    <h3>{comic.title}</h3>
                    <button onClick={() => toggleFavorite(comic._id, "comics")}>
                      Retirer des favoris
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Favorites;
