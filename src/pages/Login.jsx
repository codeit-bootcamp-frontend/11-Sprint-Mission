import React from "react";
import { NavLink } from "react-router-dom";
import { togglePwVisibility } from "utils/togglePwVisible";

function Login() {
  return (
    <div className="container">
      <h1 className="logo">
        <NavLink to="/" className="link-login" title="판다마켓 홈 이동">
          <img
            src="/images/login/logo.png"
            className="logo-img"
            alt="판다마켓 로고"
          />
        </NavLink>
      </h1>
      <form>
        <div className="input-area email">
          <label for="input_email">이메일</label>
          <input
            type="email"
            id="input_email"
            placeholder="이메일을 입력해 주세요"
            data-valid="false"
            required
          />
          <span className="msg-error">에러 메시지</span>
        </div>
        <div className="input-area password">
          <label for="input_password">비밀번호</label>
          <input
            type="password"
            id="input_password"
            className="pw"
            placeholder="비밀번호를 입력해주세요"
            data-valid="false"
            required
          />
          <span className="msg-error">에러 메시지</span>
          <button
            type="button"
            className="btn-toggle"
            title="비밀번호 노출 토글"
            onClick={togglePwVisibility}
          >
            <span className="sr-only">비밀번호 노출 토글</span>
          </button>
        </div>
        <button type="submit" className="btn login" disabled>
          로그인
        </button>
        <div className="sns-area">
          <span>간편 로그인하기</span>
          <div className="sns-wrap">
            <a
              href="https://www.google.com"
              className="btn-sns"
              title="구글 로그인 페이지 이동"
            >
              <img src="/images/icons/ic_google.png" alt="구글 아이콘" />
            </a>
            <a
              href="https://www.kakaocorp.com/page"
              className="btn-sns"
              title="카카오 로그인 페이지 이동"
            >
              <img src="/images/icons/ic_kakao.png" alt="카카오 아이콘" />
            </a>
          </div>
        </div>
        <div className="switch-area">
          판다마켓이 처음이신가요?
          <NavLink to="/signup" title="회원가입 페이지 이동">
            회원가입
          </NavLink>
        </div>
      </form>
    </div>
  );
}

export default Login;
