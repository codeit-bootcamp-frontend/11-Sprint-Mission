import React, { useState } from "react";
import "./LoginPage.css";

// 이미지 파일 import
import Logo from "../../images/logo.svg";
import GoogleIcon from "../../images/google.png";
import KakaoIcon from "../../images/kakao.png";
import EyeOpenIcon from "../../images/eyeo.svg";
import EyeClosedIcon from "../../images/eyex.svg";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordCheck: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);

  const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

  const validate = () => {
    let valid = true;
    let newErrors = {
      email: "",
      nickname: "",
      password: "",
      passwordCheck: "",
    };

    if (!email) {
      newErrors.email = "이메일을 입력해 주세요";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "잘못된 이메일 형식입니다";
      valid = false;
    }

    if (!nickname) {
      newErrors.nickname = "닉네임을 입력해 주세요";
      valid = false;
    }

    if (!password) {
      newErrors.password = "비밀번호를 입력해 주세요";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "비밀번호를 8자 이상 입력해 주세요";
      valid = false;
    }

    if (passwordCheck !== password) {
      newErrors.passwordCheck =
        passwordCheck === ""
          ? "비밀번호를 다시 한 번 입력해 주세요"
          : "비밀번호가 일치하지 않습니다";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", { email, nickname, password });
      // Handle form submission
    }
  };

  return (
    <div className="sign_div">
      <div className="logo_home">
        <a href="/">
          <img src={Logo} alt="판다마켓 홈" className="logo_img" />
        </a>
      </div>
      <form className="signinup signupForm" onSubmit={handleSubmit}>
        {/* 이메일 */}
        <div className="input_item">
          <label htmlFor="email">이메일</label>
          <input
            className="input"
            id="email"
            type="email"
            placeholder="이메일을 입력해 주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className="error_message">{errors.email}</span>
          )}
        </div>

        {/* 닉네임 */}
        <div className="input_item">
          <label htmlFor="nickname">닉네임</label>
          <input
            className="input"
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해 주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {errors.nickname && (
            <span className="error_message">{errors.nickname}</span>
          )}
        </div>

        {/* 비밀번호 */}
        <div className="input_item">
          <label htmlFor="password">비밀번호</label>
          <div className="input_div">
            <input
              className="input"
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={showPassword ? EyeOpenIcon : EyeClosedIcon}
              alt={showPassword ? "비밀번호 표시" : "비밀번호 숨김"}
              className="toggle_pwd"
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {errors.password && (
            <span className="error_message">{errors.password}</span>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className="input_item">
          <label htmlFor="passwordCheck">비밀번호 확인</label>
          <div className="input_div">
            <input
              className="input"
              id="passwordCheck"
              type={showPasswordCheck ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해 주세요."
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <img
              src={showPasswordCheck ? EyeOpenIcon : EyeClosedIcon}
              alt={showPasswordCheck ? "비밀번호 표시" : "비밀번호 숨김"}
              className="toggle_pwd"
              onClick={() => setShowPasswordCheck(!showPasswordCheck)}
            />
          </div>
          {errors.passwordCheck && (
            <span className="error_message">{errors.passwordCheck}</span>
          )}
        </div>

        <button
          type="submit"
          className={`button signupBtn ${
            email && nickname && password && passwordCheck ? "active" : ""
          }`}
          disabled={!email || !nickname || !password || !passwordCheck}
        >
          회원가입
        </button>
      </form>

      <div className="social_login_div">
        <h3>간편 로그인하기</h3>
        <div className="social_login_buttons_div">
          <a href="https://www.google.com/" target="_blank" rel="noreferrer">
            <img src={GoogleIcon} alt="구글 로그인" className="icon_img" />
          </a>
          <a
            href="https://www.kakaocorp.com/page/"
            target="_blank"
            rel="noreferrer"
          >
            <img src={KakaoIcon} alt="카카오톡 로그인" className="icon_img" />
          </a>
        </div>
      </div>

      <div className="signup_switch">
        이미 회원이신가요? <a href="/login">로그인</a>
      </div>
    </div>
  );
};

export default Signup;
