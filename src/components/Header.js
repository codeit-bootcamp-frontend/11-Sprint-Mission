import logoImg from '../assets/Group 19.svg';
import loginImg from '../assets/Frame.svg';
import '../styles/Header.css';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div className="header-left">
        <img src={logoImg} alt="logoImg" />
        <nav>
          <NavLink
            to=""
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            자유게시판
          </NavLink>
          <NavLink
            to="/items"
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            중고마켓
          </NavLink>
        </nav>
      </div>
      <a>
        <img src={loginImg} alt="loginImgBtn" />
      </a>
    </header>
  );
}

export default Header;
