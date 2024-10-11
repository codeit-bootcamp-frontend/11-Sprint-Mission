import "./Header.css";
import profileImg from "../assets/profileImg.svg";
import { Link } from "react-router-dom";
import Navigation from "./Navigation";

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

        <Navigation />

        <Link className="SubHeader__profile">
          <img src={profileImg} alt="프로필 이미지" />
        </Link>
      </div>
    </header>
  );
}
