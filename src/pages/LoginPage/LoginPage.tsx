import React, { useState } from "react";
import { Link } from "react-router-dom";
// import './common.css';
import "./LoginPage.css";

// 이미지 import
import Logo from "../../images/logo.svg";
import EyeInvisibleIcon from "../../images/eyex.svg";
import EyeVisibleIcon from "../../images/eyeo.svg";
import GoogleIcon from "../../images/google.png";
import KakaoIcon from "../../images/kakao.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  const validateEmail = () => {
    if (!email) {
      setEmailError("이메일을 입력해 주세요");
    } else if (!emailRegex.test(email)) {
      setEmailError("잘못된 이메일 형식입니다");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("비밀번호를 입력해 주세요");
    } else if (password.length < 8) {
      setPasswordError("비밀번호를 8자 이상 입력해 주세요");
    } else {
      setPasswordError("");
    }
  };

  const isFormValid = () => {
    return emailRegex.test(email) && password.length >= 8;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if (isFormValid()) {
      alert("로그인 성공!");
      // Add your login logic here
    }
  };

  return (
    <div className="sign_div">
      <div className="logo_home">
        <a href="/">
          <img src={Logo} alt="판다마켓 홈" className="logo_img" />
        </a>
      </div>

      <form className="signinup signinForm" onSubmit={handleSubmit}>
        <div className="input_item">
          <label htmlFor="email">이메일</label>
          <input
            className="input"
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해 주세요."
            value={email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
          />
          {emailError && <span className="error_message">{emailError}</span>}
        </div>

        <div className="input_item">
          <label htmlFor="password">비밀번호</label>
          <div className="input_div">
            <input
              className="input"
              id="password"
              name="password"
              type={passwordVisible ? "text" : "password"}
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={handlePasswordChange}
              onBlur={validatePassword}
            />
            <img
              src={passwordVisible ? EyeVisibleIcon : EyeInvisibleIcon}
              alt={passwordVisible ? "비밀번호 표시" : "비밀번호 숨김"}
              className="toggle_pwd"
              onClick={togglePasswordVisibility}
            />
          </div>
          {passwordError && (
            <span className="error_message">{passwordError}</span>
          )}
        </div>

        <button
          className={`button signinBtn ${isFormValid() ? "active" : ""}`}
          type="submit"
          disabled={!isFormValid()}
        >
          로그인
        </button>
      </form>

      <div className="social_login_div">
        <h3>간편 로그인하기</h3>
        <div className="social_login_buttons_div">
          <a
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="social_icon"
          >
            <img src={GoogleIcon} alt="구글 로그인" className="icon_img" />
          </a>
          <a
            href="https://www.kakaocorp.com/page/"
            target="_blank"
            rel="noopener noreferrer"
            className="social_icon"
          >
            <img src={KakaoIcon} alt="카카오톡 로그인" className="icon_img" />
          </a>
        </div>
      </div>

      <div className="signup_switch">
        판다마켓이 처음이신가요? <Link to="/signup">회원가입</Link>
      </div>
    </div>
  );
};

export default SignIn;
