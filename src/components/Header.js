import React from "react";
import { Link } from "react-router-dom";

function Header({ isLogin = false }) {
  return (
    <header>
      <h1 className="logo">
        <Link to="/" className="link-home" title="판다마켓 홈 이동">
          <img
            src="/images/home/logo.png"
            className="logo-img logo-pc"
            alt="판다마켓 로고"
          />
          <img
            src="/images/home/logo_mobile.png"
            className="logo-img logo-mobile"
            alt="판다마켓 로고"
          />
        </Link>
      </h1>
      {isLogin ? (
        <div className="login-area">
          <div className="content-link">
            <Link to="/board" title="자유 게시판 페이지 이동">
              자유 게시판
            </Link>
            <Link to="/secondhand" title="중고 마켓 페이지 이동">
              중고 마켓
            </Link>
          </div>
          <Link
            to="/profile"
            className="link-proile"
            title="프로필 페이지 이동"
          >
            <img src="/images/icons/ic_user_login.svg" alt="프로필 이미지" />
          </Link>
        </div>
      ) : (
        <Link to="/login" className="link-login" title="로그인 페이지 이동">
          로그인
        </Link>
      )}
    </header>
  );
}

export default Header;
