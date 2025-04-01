import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";

import "./header.scss";

import logo from "./../../assets/logo.png";
import * as Config from "./../../constants/Config";
import { category } from "../../api/tmdbApi";

const headerNav = [
  {
    display: <h4>Movies</h4>,
    path: `/${Config.HOME_PAGE}/movie`,
  },
  {
    display: <h4>TV Series</h4>,
    path: `/${Config.HOME_PAGE}/tv`,
  },
  {
    display: <h4>Watchlist</h4>,
    path: `/${Config.HOME_PAGE}/watchlist`,
  },
];

const Header = () => {
  const { pathname } = useLocation();
  const headerRef = useRef(null);
  const history = useHistory();

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCategory, setSearchCategory] = useState(category.movie);

  const active = headerNav.findIndex((e) => e.path === pathname);

  useEffect(() => {
    const shrinkHeader = () => {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        headerRef.current.classList.add("shrink");
      } else {
        headerRef.current.classList.remove("shrink");
      }
    };

    window.addEventListener("scroll", shrinkHeader);

    return () => {
      window.removeEventListener("scroll", shrinkHeader);
    };
  }, []);

  const handleSearch = () => {
    if (searchKeyword.trim().length > 0) {
      history.push(
        `/${Config.HOME_PAGE}/${searchCategory}/search/${searchKeyword}`
      );
      setSearchKeyword("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div ref={headerRef} className="header">
      <div className="header__wrap container">
        <div className="logo">
          <img src={logo} alt="logo" />
          <Link to={`/${Config.HOME_PAGE}`}><h2>PopcornQueue</h2></Link>
        </div>

        <ul className="header__nav">
          {headerNav.map((e, i) => (
            <li key={i} className={`${i === active ? "active" : ""}`}>
              <Link to={e.path}>{e.display}</Link>
            </li>
          ))}
        </ul>

        <div className="header__search">
          <div className="header__search__category">
            <select 
              value={searchCategory} 
              onChange={(e) => setSearchCategory(e.target.value)}
            >
              <option value={category.movie}>Movies</option>
              <option value={category.tv}>TV</option>
            </select>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <button onClick={handleSearch}>
            <i className="bx bx-search"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;