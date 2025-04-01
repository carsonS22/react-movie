import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import tmdbApi from "./../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";
import MovieList from "./../../components/movie-list/MovieList";
import Button from "../../components/button/Button";
import watchlistService from "../../services/watchlistService";

const Detail = () => {
  const { category, id } = useParams();
  const [item, setItem] = useState(null);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  useEffect(() => {
    if (item) {
      // Check if the current item is in the watchlist
      const inWatchlist = watchlistService.isInWatchlist(parseInt(id), category);
      console.log("Item in watchlist:", inWatchlist); // Debug log
      setIsInWatchlist(inWatchlist);
    }
  }, [item, id, category]);

  const toggleWatchlist = () => {
    if (isInWatchlist) {
      console.log("Removing from watchlist:", id, category); // Debug log
      watchlistService.removeFromWatchlist(parseInt(id), category);
      setIsInWatchlist(false);
    } else {
      const watchlistItem = {
        id: parseInt(id),
        title: item.title || item.name,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        category: category
      };
      console.log("Adding to watchlist:", watchlistItem); // Debug log
      watchlistService.addToWatchlist(watchlistItem);
      setIsInWatchlist(true);
    }
  };

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>

          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.backdrop_path || item.poster_path
                  )})`,
                }}
              ></div>
              <div className="watchlist-action">
                <Button onClick={toggleWatchlist}>
                  {isInWatchlist ? (
                    <>
                      <i className="bx bx-check"></i> Remove from Watchlist
                    </>
                  ) : (
                    <>
                      <i className="bx bx-plus"></i> Add to Watchlist
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, index) => (
                    <span key={index} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>

          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;