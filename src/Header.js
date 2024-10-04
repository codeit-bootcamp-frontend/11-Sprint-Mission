import logoLarge from "./assets/Property 1=lg.png";
import profileIcon from "./assets/Frame 2609463.png";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <img src={logoLarge} alt="판다마켓 로고" className="logo-large" />
        <nav className="nav">
          <p className="free-board">자유게시판</p>
          <p className="used-market">중고마켓</p>
        </nav>
      </div>
      <div className="profile-icon">
        <img src={profileIcon} alt="프로필 아이콘" />
      </div>
    </header>
  );
};

export default Header;
