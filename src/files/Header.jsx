import logoFace from "../images/logo_face.png";
import logoTxt from "../images/logo_txt.png";
import myPageIcon from "../images/myPageIcon.png";
import "./Header.css";
const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="header-logo-wrap">
          <div className="header-face-logo">
            <a href="/">
              <img src={logoFace} alt="판다얼굴" />
            </a>
          </div>
          <div className="header-face-tetx">
            <a href="/">
              <img src={logoTxt} alt="판다텍스트" />
            </a>
          </div>
        </div>
        <nav className="header-nav">
          <ol>
            <li>
              <a className="free-board" href="/">
                자유게시판
              </a>
            </li>
            <li>
              <a className="used-market" href="/">
                중고마켓
              </a>
            </li>
          </ol>
        </nav>
        <div className="header-myicon">
          <a href="/">
            <img src={myPageIcon} alt="마이페이지아이콘" />
          </a>
        </div>
      </div>
    </header>
  );
};
export default Header;
