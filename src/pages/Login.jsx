import "../styles/style.css";
import "../styles/auth.css";

import logo from "../images/logo.png";

const Login = () => {
  return (
    <div>
      <div className="container login">
        <a href="/" className="logo login">
          <img src={logo} alt="사이트 로고" />
        </a>
        <form className="login-form">
          <div>
            <label for="email">이메일</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              required
            />
            <p id="email-error" className="error-msg"></p>
          </div>
          <div>
            <label for="password">비밀번호</label>
            <div className="input-password">
              <input
                type="password"
                id="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                required
              />
              <p id="pwd-error" className="error-msg"></p>
            </div>
          </div>
          <a href="/items" id="button">
            로그인
          </a>
        </form>
        <div className="sosial-login">
          <p>간편 로그인하기</p>
          <div className="ic-login">
            <a
              href="https://www.google.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="images/ic_google.svg" alt="구글 로고 - 구글 간편 로그인" />
            </a>
            <a
              href="https://www.kakaocorp.com/page/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="images/ic_kakaotalk.svg"
                alt="카카오톡 로고 - 카카오 간편 로그인"
              />
            </a>
          </div>
        </div>
        <div className="auth-toggle">
          <p>판다마켓이 처음이신가요?</p>
          <a href="/signup.html">회원가입</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
