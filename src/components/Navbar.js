import { NavLink } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../image/login-logo.png';
import profileImg from '../image/profile-img.png';

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? '#3692ff' : undefined,
  };
}

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-wrapper">
        <div className="navbar-logo">
          <img src={logoImg} alt="로고" />
        </div>
        <div className="navbar-menus">
          <NavLink to="/freeboard" style={getLinkStyle} className="navbar-menu">
            자유게시판
          </NavLink>
          <NavLink to="/items" style={getLinkStyle} className="navbar-menu">
            중고마켓
          </NavLink>
        </div>
      </div>
      <div className="navbar-profile">
        <img src={profileImg} alt="프로필" />
      </div>
    </div>
  );
}

export default Navbar;
