import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as validation from "components/Validation";
import "./Login.css";
import { ImgPath, TextInput } from "components/index";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [emailNotice, setEmailNotice] = useState("");
  const [pwdNotice, setPwdNotice] = useState("");
  const navigate = useNavigate();
  const { emailValidationMsg, pwdValidationMsg, showPassword, emptyCheck } =
    validation;

  const updateLoginButtonState = () => {
    // 다른 input에 값이 있는지 체크
    const checkInput = emptyCheck([email, password]);
    const button = document.querySelector(".login-btn");
    // 로그인 버튼 활성화
    if (checkInput && emailNotice.length < 1 && pwdNotice.length < 1) {
      button.classList.add("login-btn-active");
      setLoginDisabled(false);
    } else {
      button.classList.remove("login-btn-active");
      setLoginDisabled(true);
    }
  };

  const inputBlur = (e) => {
    const inputValue = e.target.value;
    const inputType = e.target.type;

    let noticeMsg = "";
    if (inputType === "email") {
      noticeMsg = emailValidationMsg(inputValue);
      setEmailNotice(noticeMsg);
    } else {
      noticeMsg = pwdValidationMsg(inputValue);
      setPwdNotice(noticeMsg);
    }

    // 알림 활성화
    if (noticeMsg.length > 0) {
      e.target.classList.add("input-notice");
    } else {
      e.target.classList.remove("input-notice");
    }
    updateLoginButtonState();
  };

  const handleEmailChange = (inputValue) => {
    setEmail(inputValue);
  };
  const handlePasswordChange = (inputValue) => {
    setPassword(inputValue);
  };

  const loginClick = () => {
    navigate("/item");
  };

  return (
    <div className="login-body">
      <div className="login-form">
        <header className="login-header">
          <div className="login-title">
            <img src={ImgPath("/common/panda.png")} alt="panda" />
            <Link to="/">판다마켓</Link>
          </div>
        </header>
        <main>
          <TextInput
            className="inputBox"
            type="email"
            placeholder="이메일을 입력해주세요"
            onChange={handleEmailChange}
            onBlur={inputBlur}
          >
            <h3>이메일</h3>
          </TextInput>
          <span id="message" className="notice-email">
            {emailNotice}
          </span>
          <div className="inputBox-eye">
            <TextInput
              id="password"
              className="inputBox"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              onChange={handlePasswordChange}
              onBlur={inputBlur}
            >
              <h3>비밀번호</h3>
              <input type="button" className="eye" onClick={showPassword} />
            </TextInput>
            <span id="message" className="notice-password">
              {pwdNotice}
            </span>
          </div>
          <div className="content">
            <button
              className="login-btn"
              disabled={loginDisabled}
              onClick={loginClick}
            >
              로그인
            </button>
          </div>
          <div className="content">
            <div className="easy-login">
              <span>간편 로그인하기</span>
              <div>
                <a href="https://www.google.com">
                  <img src={ImgPath("/common/ic_google.png")} alt="google" />
                </a>
                <a href="https://www.kakaocorp.com/page">
                  <img src={ImgPath("/common/ic_kakao.png")} alt="kakao" />
                </a>
              </div>
            </div>
          </div>
          <footer className="login-footer">
            <div>
              <span className="left">판다마켓이 처음이신가요?</span>
              <Link to="/signup" className="right">
                회원가입
              </Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Login;
