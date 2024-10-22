import { NavLink, useLocation } from 'react-router-dom';
import './Navbar.css';
import logoImg from '../image/login-logo.png';
import profileImg from '../image/profile-img.png';

function Navbar() {
  const location = useLocation();
  // 파라미터로 경로를 받아, 현재 경로(location.pathname)가 포함되어 있는지 여부
  const getLinkStyle = (targetPaths) => ({
    color: targetPaths.includes(location.pathname) ? '#3692FF' : undefined,
  });

  return (
    <div className="navbar">
      <div className="nav-wrapper">
        <div className="navbar-logo">
          <img src={logoImg} alt="로고" />
        </div>
        <div className="navbar-menus">
          <NavLink
            to="/freeboard"
            style={() => getLinkStyle('/freeboard')}
            className="navbar-menu"
          >
            자유게시판
          </NavLink>
          <NavLink
            to="/items"
            style={() => getLinkStyle(['/items', '/additem'])}
            className="navbar-menu"
          >
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
