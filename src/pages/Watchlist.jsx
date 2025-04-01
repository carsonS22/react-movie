import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import "./watchlist.scss";

import PageHeader from "../components/page-header/PageHeader";
import MovieCard from "../components/movie-card/MovieCard";
import watchlistService from "../watchlistService";
import * as Config from "../constants/Config";
import { OutlineButton } from "../components/button/Button";

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const history = useHistory();

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = () => {
    const items = watchlistService.getWatchlist();
    console.log("Loaded watchlist items:", items); // Debug log
    setWatchlist(items);
  };

  const handleRemoveItem = (id, category) => {
    watchlistService.removeFromWatchlist(id, category);
    loadWatchlist();
  };

  const filteredItems = activeFilter === 'all' 
    ? watchlist 
    : watchlist.filter(item => item.category === activeFilter);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <>
      <PageHeader>My Watchlist</PageHeader>

      <div className="container">
        <div className="section mb-3">
          <div className="watchlist__filters">
            <OutlineButton 
              className={activeFilter === 'all' ? 'active' : ''}
              onClick={() => handleFilterChange('all')}
            >
              All
            </OutlineButton>
            <OutlineButton 
              className={activeFilter === 'movie' ? 'active' : ''}
              onClick={() => handleFilterChange('movie')}
            >
              Movies
            </OutlineButton>
            <OutlineButton 
              className={activeFilter === 'tv' ? 'active' : ''}
              onClick={() => handleFilterChange('tv')}
            >
              TV Shows
            </OutlineButton>
          </div>

          {filteredItems.length > 0 ? (
            <div className="watchlist__grid">
              {filteredItems.map((item, index) => (
                <div key={index} className="watchlist__item">
                  <MovieCard item={item} category={item.category} />
                  <button 
                    className="watchlist__item__remove"
                    onClick={() => handleRemoveItem(item.id, item.category)}
                  >
                    <i className="bx bx-x"></i>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="watchlist__empty">
              <h3>Your watchlist is empty</h3>
              <p>
                Start adding movies and TV shows to keep track of what you want to watch.
              </p>
              <div className="watchlist__empty__actions">
                <OutlineButton onClick={() => history.push(`/${Config.HOME_PAGE}/movie`)}>
                  Browse Movies
                </OutlineButton>
                <OutlineButton onClick={() => history.push(`/${Config.HOME_PAGE}/tv`)}>
                  Browse TV Shows
                </OutlineButton>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Watchlist;