import "./Header.css";
import profileImg from "../assets/profileImg.svg";

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
          <a className="SubHeader__logo" href="/"></a>
        </h1>

        <ul className="SubHeader__nav">
          <li>
            <a href="">자유게시판</a>
          </li>

          <li>
            <a href="/">중고마켓</a>
          </li>
        </ul>

        <a href="#" className="SubHeader__profile">
          <img src={profileImg} alt="프로필 이미지" />
        </a>
      </div>
    </header>
  );
}
