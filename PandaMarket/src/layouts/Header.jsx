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
          <Link className="logo" to="/">
            로고
          </Link>
        </h1>

        <Link className="login" to="login.html">
          로그인
        </Link>
      </div>
    </header>
  );
}

export function SubHeader() {
  return (
    <header className="SubHeader">
      <div className="SubHeader__inner">
        <h1>
          <Link to="/" className="SubHeader__logo"></Link>
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

        <Link className="SubHeader__profile">
          <img src={profileImg} alt="프로필 이미지" />
        </Link>
      </div>
    </header>
  );
}
