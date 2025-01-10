import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { reset } from "../redux/counterAccessToken";
import clsx from "clsx";
import "./NavBar.css";
import profile from "../assets/image/size=large.png";

const NavBar = () => {
  const location = useLocation();
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };
  const handleLogout = () => {
    dispatch(reset());
    localStorage.clear();
    navigate("/");
  };

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
      <div className="dropdown-box">
        <img
          src={profile}
          alt="사용자 프로필 이미지"
          onClick={toggleDropdown}
          className="profile-navbar"
        />
        {isDropdownVisible && (
          <div className="dropdown">
            <button className="logout-button" onClick={handleLogout}>
              로그아웃
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default NavBar;
