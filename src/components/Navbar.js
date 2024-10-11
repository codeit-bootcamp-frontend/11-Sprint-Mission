import { Link } from 'react-router-dom';
import './Navbar.css';
import '../styles/Reset.css';
import logoImg from '../image/login-logo.png';
import profileImg from '../image/profile-img.png';

function Navbar() {
  return (
    <div className="navbar">
      <div className="nav-wrapper">
        <div className="navbar-logo">
          <img src={logoImg} alt="로고" />
        </div>
        <div className="navbar-menus">
          <Link to="/freeboard" className="navbar-menu">
            자유게시판
          </Link>
          <Link to="/items" className="navbar-menu">
            중고마켓
          </Link>
        </div>
      </div>
      <div className="navbar-profile">
        <img src={profileImg} alt="프로필" />
      </div>
    </div>
  );
}

export default Navbar;
