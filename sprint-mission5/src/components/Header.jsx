import logoFace from "../images/head/logo_face.png";
import logoTxt from "../images/head/logo_txt.png";
import myPageIcon from "../images/head/myPageIcon.png";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function getLinkStyle({ isActive }) {
  return { color: isActive ? "var(--pgnibtn)" : undefined };
}

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="header-logo-wrap">
          <div className="header-face-logo">
            <Link to="/">
              <img src={logoFace} alt="판다얼굴" />
            </Link>
          </div>
          <div className="header-face-tetx">
            <Link to="/">
              <img src={logoTxt} alt="판다텍스트" />
            </Link>
          </div>
        </div>
        <nav className="header-nav">
          <ol>
            <li>
              <NavLink
                to="/FreeBoard"
                className="free-board"
                style={getLinkStyle}
              >
                자유게시판
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/ItemContainer"
                className="used-market"
                style={getLinkStyle}
              >
                중고마켓
              </NavLink>
            </li>
          </ol>
        </nav>
        <div className="header-myicon">
          <Link to="/">
            <img src={myPageIcon} alt="마이페이지아이콘" />
          </Link>
        </div>
      </div>
    </header>
  );
};
export default Header;
