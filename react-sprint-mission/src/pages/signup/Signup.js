import React, { useState } from "react";
import "./Signup.css";
import * as validation from "components/Validation";
import { Link, useNavigate } from "react-router-dom";

function Signup(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwdConfirm, setPwdConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [loginDisabled, setLoginDisabled] = useState(true);
  const [emailNotice, setEmailNotice] = useState("");
  const [nicknameNotice, setNicknameNotice] = useState("");
  const [pwdNotice, setPwdNotice] = useState("");
  const [pwdConfirmNotice, setPwdConfirmNotice] = useState("");
  const navigate = useNavigate();
  const imgPath = (fileName) => `${process.env.PUBLIC_URL}/assets${fileName}`;
  const { emailValidationMsg, pwdValidationMsg, showPassword, emptyCheck } = validation;

  const updateLoginButtonState = (noticeMsg) => {
    // 다른 input에 값이 있는지 체크
    const checkInput = emptyCheck([email, nickname, password, pwdConfirm]);
    const button = document.querySelector(".signup-btn");
    // 로그인 버튼 활성화
    if (checkInput && noticeMsg.length < 1) {
      button.classList.add("signup-btn-active");
      setLoginDisabled(false);
    } else {
      button.classList.remove("signup-btn-active");
      setLoginDisabled(true);
    }
  };

  const inputBlur = (inputType) => (e) => {
    const inputValue = e.target.value;
    let noticeMsg = "";
    switch (inputType) {
      case "email":
        noticeMsg = emailValidationMsg(inputValue);
        setEmailNotice(noticeMsg);
        break;
      case "nickname":
        if (inputValue.length < 1) noticeMsg = "닉네임을 입력해주세요";
        setNicknameNotice(noticeMsg);
        break;
      case "pwd":
        noticeMsg = pwdValidationMsg(inputValue);
        setPwdNotice(noticeMsg);
        break;
      default:
        noticeMsg = pwdValidationMsg(inputValue, true);
        setPwdConfirmNotice(noticeMsg);
        break;
    }

    // 알림 활성화
    if (noticeMsg.length > 0) {
      e.target.classList.add("input-notice");
    } else {
      e.target.classList.remove("input-notice");
    }
    updateLoginButtonState(noticeMsg);
  };

  const inputChange = (inputType) => (e) => {
    const inputValue = e.target.value;
    switch (inputType) {
      case "email":
        setEmail(inputValue);
        break;
      case "nickname":
        setNickname(inputValue);
        break;
      case "pwd":
        setPassword(inputValue);
        break;
      default:
        setPwdConfirm(inputValue);
        break;
    }
  };

  const loginClick = () => {
    navigate("/signin");
  };

  return (
    <div className="signup-body">
      <div className="signup-form">
        <header className="signup-header">
          <div className="signup-title">
            <img src={imgPath("/common/panda.png")} alt="panda" />
            <Link to="/">판다마켓</Link>
          </div>
        </header>
        <main>
          <div className="content-big">
            <form className="content-title">이메일</form>
            <input
              className="inputBox"
              type="email"
              placeholder="이메일을 입력해주세요"
              value={email}
              onChange={inputChange("email")}
              onBlur={inputBlur("email")}
            />
            <span id="message" className="notice-email">
              {emailNotice}
            </span>
          </div>
          <div className="content-big">
            <form className="content-title">닉네임</form>
            <input
              className="inputBox"
              type="text"
              placeholder="닉네임을 입력해주세요"
              value={nickname}
              onChange={inputChange("nickname")}
              onBlur={inputBlur("nickname")}
            />
            <span id="message" className="notice-nickname">
              {nicknameNotice}
            </span>
          </div>
          <div className="content-big">
            <form className="content-title">비밀번호</form>
            <div className="inputBox-eye">
              <input
                id="password"
                className="inputBox"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={inputChange("pwd")}
                onBlur={inputBlur("pwd")}
              />
              <input type="button" className="eye" onClick={showPassword} />
            </div>
            <span id="message" className="notice-password">
              {pwdNotice}
            </span>
          </div>
          <div className="content-big">
            <form className="content-title">비밀번호 확인</form>
            <div className="inputBox-eye">
              <input
                className="inputBox"
                type="password"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                value={pwdConfirm}
                onChange={inputChange("pwdConfirm")}
                onBlur={inputBlur("pwdConfirm")}
              />
              <input type="button" className="eye" onClick={showPassword} />
            </div>
            <span id="message" className="notice-password-confirm">
              {pwdConfirmNotice}
            </span>
          </div>
          <div className="content">
            <button className="signup-btn" disabled={loginDisabled} onClick={loginClick}>
              회원가입
            </button>
          </div>
          <div className="content">
            <div className="easy-login">
              <span>간편 로그인하기</span>
              <div>
                <a href="https://www.google.com">
                  <img src={imgPath("/common/ic_google.png")} alt="google" />
                </a>
                <a href="https://www.kakaocorp.com/page">
                  <img src={imgPath("/common/ic_kakao.png")} alt="kakao" />
                </a>
              </div>
            </div>
          </div>
          <footer className="login-footer">
            <div>
              <span className="left">이미 회원이신가요?</span>
              <Link to="/Login" className="right">
                로그인
              </Link>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default Signup;
