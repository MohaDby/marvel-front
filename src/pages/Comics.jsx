import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Pagination from "../components/Pagination";

const Comics = () => {
  const [comics, setComics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const userToken = Cookies.get("userToken");

  useEffect(() => {
    const fetchComics = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--9x82jlrpnwgd.code.run/comics?page=${page}&title=${search}`
        );

        setComics(response.data.results);

        setTotalPages(Math.ceil(response.data.total / 100));

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchComics();
  }, [page, search]);

  const handleFavoriteToggle = async (comicId) => {
    if (!userToken) {
      toast.error("Veuillez vous connecter pour gérer vos favoris.");
      return;
    }
    try {
      const response = await axios.post(
        `https://site--backend-marvel--9x82jlrpnwgd.code.run/user/favorites/comics`,
        { comicId },
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
      <main className="comics-main">
        <div className="container">
          <div className="hero">
            <h2>COMICS</h2>
          </div>
          <div className="comics-container">
            <div>
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Rechercher..."
              />
            </div>
            <div className="comics-sheet">
              {comics.map((comics) => {
                return (
                  <div key={comics._id} className="comic-card">
                    <div className="comic-img">
                      <img
                        src={`${comics.thumbnail.path}/portrait_uncanny.${comics.thumbnail.extension}`}
                        alt=""
                      />
                      {comics.description && (
                        <p className="hover-text">{comics.description}</p>
                      )}
                    </div>
                    <div className="comic-infos">
                      <h2>{comics.title}</h2>
                      <button onClick={() => handleFavoriteToggle(comics._id)}>
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

export default Comics;
