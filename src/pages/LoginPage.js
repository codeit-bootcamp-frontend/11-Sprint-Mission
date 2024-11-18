import React from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import logoImage from "./../images/logo_image.png";
import eyeImage from "./../images/icon/icon_eyes_close.png";
import googleIcon from "./../images/icon/ic_google.png";
import kakaoIcon from "./../images/icon/ic_kakao.png";

const LoginPage = () => {
  return (
    <div className="auth-container">
      <header className="auth-header">
        <h1>
          <Link to="/">
            <img
              src={logoImage}
              width="396px"
              height="132px"
              alt="메인화면이동"
            />
          </Link>
        </h1>
      </header>
      <main className="auth-main">
        <form className="auth-form" id="authForm" action="/items" method="GET">
          <div className="auth-field">
            <label className="auth-label" htmlFor="passwordInput1">
              비밀번호
            </label>
            <div className="auth-div">
              <input
                id="passwordInput1"
                className="input input-gray"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                required
                data-valid="false"
              />
              <img
                src={eyeImage}
                className="eyes-close"
                alt="비밀번호보이기"
              ></img>
              <span className="wrong-txt"></span>
            </div>
          </div>
          <div className="auth-field">
            <label className="auth-label" htmlFor="passwordInput2">
              비밀번호
            </label>
            <div className="auth-div">
              <input
                id="passwordInput2"
                className="input input-gray"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                required
                data-valid="false"
              />
              <img
                src={eyeImage}
                className="eyes-close"
                alt="비밀번호보이기"
              ></img>
              <span className="wrong-txt"></span>
            </div>
          </div>
          <button
            type="submit"
            id="submitBtn"
            className="btn btn-gray-round-xl"
            disabled
          >
            로그인
          </button>
        </form>
        <div className="auth-box">
          <Link className="auth-gopage" to="">
            간편 로그인하기
          </Link>
          <div className="auth-snsbox">
            <Link target="_self" to="https://www.google.com/">
              <img src={googleIcon} alt="구글로그인아이콘" />
            </Link>
            <Link target="_self" to="https://www.kakaocorp.com/page/">
              <img src={kakaoIcon} alt="카카오로그인아이콘" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
