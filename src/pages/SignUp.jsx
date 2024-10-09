import "../styles/style.css";
import "../styles/auth.css";

import logo from "../images/logo.png";

const SignUp = () => {
  return (
    <div>
      <div className="container signup">
        <a href="/" className="logo signup">
          <img src={logo} alt="사이트 로고" />
        </a>
        <form className="signup-form">
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
            <label for="nickname">닉네임</label>
            <input
              type="text"
              id="nickname"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              required
            />
            <p id="nickname-error" className="error-msg"></p>
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
          <div>
            <label for="confirm_password">비밀번호 확인</label>
            <div className="input-password">
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                required
              />
              <p id="confirmpwd-error" className="error-msg"></p>
            </div>
          </div>
          <a href="/signup.html" id="button">
            회원가입
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
          <p>이미 회원이신가요?</p>
          <a href="/login.html">로그인</a>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
