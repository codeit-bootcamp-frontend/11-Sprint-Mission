import logoImg from '../assets/Group 19.svg';
import loginImg from '../assets/Frame.svg';
import '../styles/Header.css';

function Header() {
  return (
    <header>
      <div className="header-left">
        <img src={logoImg} alt="logoImg" />
        <nav>
          <a className="freeNotice">자유게시판</a>
          <a className="usedMarket" href="/items">
            중고마켓
          </a>
        </nav>
      </div>
      <a>
        <img src={loginImg} alt="loginImgBtn" />
      </a>
    </header>
  );
}

export default Header;
