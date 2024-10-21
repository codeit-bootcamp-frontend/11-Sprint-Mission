import { NavLink } from 'react-router-dom';
import '../css/header.css';
import logo from '../assets/logo.png';
import profile from '../assets/profile.png';

function Header() {
  return (
    <header>
      <div className="header__content">
        <a href="/index.html">
          <img className="logo" src={logo} alt="판다마켓 로고" />
        </a>
        <div className="header__content__menu">
          <NavLink
            to="/Board"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            자유게시판
          </NavLink>
          <NavLink
            to="/Items"
            className={({ isActive }) =>
              isActive || window.location.pathname === '/AddItem'
                ? 'active'
                : ''
            }
          >
            중고마켓
          </NavLink>
        </div>
      </div>
      <a href="/profile.html">
        <img className="profile" src={profile} alt="프로필 바로가기" />
      </a>
    </header>
  );
}

export default Header;
