import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import profile from "../assets/image/size=large.png";

const NavBar = () => {
  return (
    <section className="Nav">
      <div className="Nav-first-section">
        <Link to="/">
          <div className="Nav-logo-box"></div>
        </Link>
        <div className="Nav-menu-box">
          <p className="menu-free">자유게시판</p>
          <p className="menu-used">중고마켓</p>
        </div>
      </div>
      <div>
        <img src={profile} alt="사용자 프로필 이미지" />
      </div>
    </section>
  );
};

export default NavBar;
