import React from "react";
import { Link } from "react-router-dom";
import './Header.css'
function Header({ leftMenu, rightMenu }) {
  return (
    <header>
      <nav className="nav-bar">
        <div className="menu-wrapper">
          <Link to="/" aria-label="Panda Market Home">
            <img id="logo" src="images/logos/logo.png" alt="판다마켓 로고" />
          </Link>
          <div className="menu">
            {leftMenu}
          </div>
        </div>
        <div className="right-menu">
          {rightMenu}
        </div>
      </nav>
    </header>
  );
}

export default Header;