import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Character = () => {
  const { id } = useParams();
  const [characterData, setCharacterData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [characterComics, setCharacterComics] = useState();

  const characterId = id;

  const settings = {
    className: "center",
    dots: true,
    infinite: false,

    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    waitForAnimate: false,
  };

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        const response = await axios.get(
          `https://site--backend-marvel--9x82jlrpnwgd.code.run/character/${id}`
        );
        const comicsResponse = await axios.get(
          `https://site--backend-marvel--9x82jlrpnwgd.code.run/comics/${characterId}`
        );
        setCharacterData(response.data);
        setCharacterComics(comicsResponse.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCharacterData();
  }, [id]);

  return isLoading ? (
    <p>En cours de chargement</p>
  ) : (
    <>
      <main className="character-main">
        <div className="container">
          <div className="character-hero">
            <div className="character-hero-container">
              <img
                src={`${characterData.thumbnail.path}/portrait_uncanny.${characterData.thumbnail.extension}`}
                alt=""
              />
              <div className="character-details">
                <h2>{characterData.name}</h2>
                <p>{characterData.description}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="slider-container">
            <h3>{`${characterData.name} : Comic Books`}</h3>
            <Slider {...settings}>
              {characterComics.comics.map((comics) => {
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
                      <h1>{comics.title}</h1>
                    </div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      </main>
    </>
  );
};

export default Character;
