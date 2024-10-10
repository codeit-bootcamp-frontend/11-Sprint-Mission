import logoImg from '../assets/Group 19.svg';
import loginImg from '../assets/Frame.svg';
import '../styles/Header.css';
import { NavLink } from 'react-router-dom';

function getLinkStyle({ isActive }) {
  return {
    backgroundColor: isActive ? '#3692FF' : '',
  };
}

function Header() {
  return (
    <header>
      <div className="headerBody">
        <div className="header-left">
          <div className="imgContainer">
            <img className="logoImg" src={logoImg} alt="logoImg" />
          </div>
          <nav>
            <NavLink
              to=""
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={getLinkStyle}
            >
              자유게시판
            </NavLink>
            <NavLink
              to="/items"
              className={({ isActive }) => (isActive ? 'active' : '')}
              style={getLinkStyle}
            >
              중고마켓
            </NavLink>
          </nav>
        </div>
        <a>
          <img src={loginImg} alt="loginImgBtn" />
        </a>
      </div>
    </header>
  );
}

export default Header;
