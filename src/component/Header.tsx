import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../images/logo.png";
import Profile from "../images/profile.png";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="headerSection">
        <NavLink to="/" className="homeLogo">
          <img src={Logo} alt="판다마켓 로고" className="logoImg" />
        </NavLink>

        <nav>
          <div className="listSection">
            <NavLink to="/community" className="communityLink">
              자유게시판
            </NavLink>
            <NavLink to="/items" className="itemLink">
              중고마켓
            </NavLink>
          </div>
        </nav>
      </div>

      <NavLink to="/login" className="progileSection">
        <img src={Profile} alt="프로필" className="profileImg" />
      </NavLink>
    </header>
  );
};

export default Header;
