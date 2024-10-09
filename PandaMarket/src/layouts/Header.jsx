import "./Header.css";
import profileImg from "../assets/profileImg.svg";
import { Link, NavLink } from "react-router-dom";

function getLinkStyle({ isActive }) {
  return {
    color: isActive ? "#3692ff" : undefined,
  };
}

export function MainHeader() {
  return (
    <header className="MainHeader">
      <div className="inner">
        <h1>
          <a className="logo" href="/">
            로고
          </a>
        </h1>

        <a className="login" href="login.html">
          로그인
        </a>
      </div>
    </header>
  );
}

export function SubHeader() {
  return (
    <header className="SubHeader">
      <div className="SubHeader__inner">
        <h1>
          <Link to="/">
            <a className="SubHeader__logo"></a>
          </Link>
        </h1>

        <ul className="SubHeader__nav">
          <li>
            <NavLink to="/Boards" style={getLinkStyle}>
              자유게시판
            </NavLink>
          </li>

          <li>
            <NavLink to="/items" style={getLinkStyle}>
              중고마켓
            </NavLink>
          </li>
        </ul>

        <a href="#" className="SubHeader__profile">
          <img src={profileImg} alt="프로필 이미지" />
        </a>
      </div>
    </header>
  );
}
