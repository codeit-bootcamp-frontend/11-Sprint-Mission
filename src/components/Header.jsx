import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="">
        <img className="pandaLogo" src="/Icon/pandaLogo.svg" alt="panda logo" />
        <h1>판다마켓</h1>
      </div>
      <div>
        <Link to="/">자유게시판</Link>
        <Link to="/items">중고마켓</Link>
      </div>
      <img className="profileIcon" src="/Icon/profile.svg" alt="profile icon" />
    </header>
  );
};

export default Header;
