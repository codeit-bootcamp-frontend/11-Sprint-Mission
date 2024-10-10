import { useLocation } from "react-router-dom";
import logoLarge from "../assets/Property 1=lg.png";
import profileIcon from "../assets/Frame 2609463.png";
import "./common.css";

const Nav = () => {
  const location = useLocation();

  return (
    <nav className="nav-container">
      <div className="nav-bar">
        <div className="nav-front">
          <img className="logoLarge" src={logoLarge} alt="판다마켓 로고" />
          <div className="nav-board">
            <a href="#" className="nav-board-free-board">
              자유게시판
            </a>
            <a href="/items" className="nav-board-used-market">
              중고마켓
            </a>
          </div>
        </div>
        <img className="nav-end" src={profileIcon} alt="프로필 아이콘" />
      </div>
    </nav>
  );
};

export default Nav;
