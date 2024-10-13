import logo from "../assets/logo.png";
import character from "../assets/character.svg";
import "./Nav.css";

function Nav() {
  return (
    <header className="nav-bar">
      <nav className="nav-content">
        <div className="logo">
          <img src={logo} alt="로고" />
          <a href="./index.html" className="title">
            판다마켓
          </a>
        </div>
        <ul className="tab">
          <li className="tab-list">
            <a id="board" href="./board">
              자유게시판
            </a>
          </li>
          <li className="tab-list">
            <a id="fleaMarket" href="./items">
              중고마켓
            </a>
          </li>
        </ul>
      </nav>
      <img src={character} alt="캐릭터" />
    </header>
  );
}

export default Nav;
