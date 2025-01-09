import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";
import "./NavBar.css";
import profile from "../assets/image/size=large.png";

const NavBar = () => {
  const location = useLocation();
  return (
    <section className="Nav">
      <div className="Nav-first-section">
        <Link to="/">
          <div className="Nav-logo-box"></div>
        </Link>
        <div className="Nav-menu-box">
          <Link to="/boards" className="Nav-menu-link">
            <p
              className={clsx("menu-free", {
                active: location.pathname === "/boards",
              })}
            >
              자유게시판
            </p>
          </Link>
          <Link to="/items" className="Nav-menu-link">
            <p
              className={clsx("menu-used", {
                active: location.pathname === "/items",
              })}
            >
              중고마켓
            </p>
          </Link>
        </div>
      </div>
      <div>
        <img src={profile} alt="사용자 프로필 이미지" />
      </div>
    </section>
  );
};

export default NavBar;
