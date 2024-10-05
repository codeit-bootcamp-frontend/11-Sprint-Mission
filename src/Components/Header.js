import logo from '../assets/logo.svg';
import txtLogo from '../assets/txt-logo.svg';
import baseAvatar from '../assets/base-avatar.svg';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="container">
        <nav className="gnb" aria-label="Global">
          <a href="/#" className="flex items-center gap-2">
            <img src={logo} alt="판다마켓 로고" />
            <img src={txtLogo} alt="판다마켓" />
          </a>

          <ul className="links">
            <li>
              <a href="#/">자유게시판</a>
            </li>
            <li>
              <a href="/items">중고마켓</a>
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
