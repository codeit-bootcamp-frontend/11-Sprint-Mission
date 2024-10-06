import logo from "../images/logo.png";
import character from "../images/character.svg";
import "./Nav.css";

function Nav() {
  return (
    <header>
      <div className="header">
        <div className="head">
          <div className="logo">
            <img src={logo} alt="로고" />
            <h1>
              <a href="./index.html" className="title">
                판다마켓
              </a>
            </h1>
          </div>
          <div className="tab">
            <a id="board" href="./board">
              자유게시판
            </a>
            <a id="fleaMarket" href="./Items">
              중고마켓
            </a>
          </div>
        </div>
        <img src={character} alt="캐릭터" />
      </div>
    </header>
  );
}

export default Nav;
