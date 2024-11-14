import { useLocation } from "react-router-dom";
import logoLarge from "../assets/Property 1=lg.png";
import profileIcon from "../assets/Frame 2609463.png";
import "./common.css";
import "./Nav.css";

const Nav = () => {
  const location = useLocation();

  return (
    <nav className="nav-container">
      <div className="nav-bar">
        <div className="nav-front">
          <a href="/index">
            <img className="nav-logo" src={logoLarge} alt="판다마켓 로고" />
          </a>
          <div className="nav-board">
            <a href="/freeBoard" className="nav-board-free-board">
              자유게시판
            </a>
            <a
              href="/items"
              className={`nav-board-used-market ${
                location.pathname === "/items" ||
                location.pathname === "/additem"
                  ? "active"
                  : ""
              }`}
            >
              중고마켓
            </a>
          </div>
        </div>
        <a href="/profile">
          <img className="nav-icon" src={profileIcon} alt="프로필 아이콘" />
        </a>
      </div>
    </nav>
  );
};

export default Nav;
