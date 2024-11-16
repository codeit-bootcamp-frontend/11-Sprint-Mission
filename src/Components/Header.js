import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import txtLogo from '../assets/txt-logo.svg';
import baseAvatar from '../assets/base-avatar.svg';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav className="gnb" aria-label="Global">
          <Link to="/" className="flex items-center gap-2">
            <img className="hidden sm:block" src={logo} alt="판다마켓 로고" />
            <img src={txtLogo} alt="판다마켓" />
          </Link>

          <ul className="links">
            <li>
              <a href="#/">자유게시판</a>
            </li>
            <li>
              <NavLink to="/items" className="market">
                중고마켓
              </NavLink>
            </li>
          </ul>
        </nav>

        <a href="#/">
          <img src={baseAvatar} alt="아바타" />
        </a>
      </div>
    </header>
  );
}
