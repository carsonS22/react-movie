import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/logo.png";
import * as Config from "./../../constants/Config";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__content container">
       
        <div className="footer__content__logo">
          <div className="logo">
            <img src={logo} alt="logo" />
            <Link to={`/${Config.HOME_PAGE}`}><h4>PopcornQueue</h4></Link>
          </div>
        </div>
        
       
       
              <h4>Browse</h4>
              <ul>
                <li><Link to={`/${Config.HOME_PAGE}/tv`}>TV Shows</Link></li>
                <li><Link to={`/${Config.HOME_PAGE}/movie`}>Movies</Link></li>
              </ul>
      </div>
    </div>
  );
};

export default Footer;