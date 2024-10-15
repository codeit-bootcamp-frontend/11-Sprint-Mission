import React from "react";
import { NavLink, Link } from "react-router-dom";
import "../css/navbar.css";
import logo from "../img/logo.png";
import profile from "../img/profile.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-links">
          <NavLink to="/" className="logo-link">
            <img src={logo} alt="Logo" className="logo" />
          </NavLink>
          <NavLink to="/" activeclassName="active">
            자유게시판
          </NavLink>
          <NavLink to="/items" activeclassName="active">
            중고마켓
          </NavLink>
        </div>

        <Link to={"/profile"} className="profile-link">
          <img src={profile} alt="Profile Icon" className="profile-icon" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
