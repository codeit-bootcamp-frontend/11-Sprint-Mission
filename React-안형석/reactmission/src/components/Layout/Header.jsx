import React from "react";
import Logo from "../../images/logo/logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function getLinkStyle({ isActive }) {
  return { color: isActive ? "var(--blue)" : undefined };
}

function Header() {
  return (
    <header className="globalHeader">
      <div className="headerLeft">
        <Link to="/" className="headerLogo" >
          <img src={Logo} alt="판다마켓 로고" width="150" />
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink to="/community" style={getLinkStyle}>
                자유게시판
              </NavLink>
            </li>
            <li>
              <NavLink to="/items" style={getLinkStyle}>
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <Link to="/login" className="loginLink">
        로그인
      </Link>
    </header>
  );
}

export default Header;
