import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/image/Property 1=lg.png";

function Header() {
  return (
    <header className="header">
      <Link to="/">
        <div>
          <img className="logo" src={logo} alt="판다마켓" />
        </div>
      </Link>
      <Link to="/login">
        <button className="button header-button">로그인</button>
      </Link>
    </header>
  );
}

export default Header;
