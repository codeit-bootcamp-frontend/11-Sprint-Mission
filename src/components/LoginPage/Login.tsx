import React, { ChangeEvent, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputField from "./InputField";
import LoginButton from "./LoginButton";
import SocialLogin from "./SocialLogin";
import SignUpLink from "./SignUpLink";
import "./Login.css";
import logo from "../../assets/image/Property 1=lg.png";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isButtonActive, setIsButtonActive] = useState<boolean>(false);

  useEffect(() => {
    const isEmailValid = email && !emailError;
    const isPasswordValid = password && !passwordError;
    setIsButtonActive(!!(isEmailValid && isPasswordValid));
  }, [email, password, emailError, passwordError]);

  const validateEmail = (value: string) => {
    if (!value) return "이메일을 입력해주세요.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return "잘못된 이메일 형식입니다.";
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value) return "비밀번호를 입력해주세요.";
    if (value.length < 8) return "비밀번호를 8자 이상 입력해주세요.";
    return "";
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  const handleLoginButtonClick = () => {
    if (!email) setEmailError("이메일을 입력해주세요.");
    if (!password) setPasswordError("비밀번호를 입력해주세요.");
  };

  return (
    <main className="login-main">
      <section className="login-main-box">
        <section className="login-main-box-logo">
          <Link to="/">
            <img className="login-logo" src={logo} alt="판다마켓" />
          </Link>
        </section>
        <section className="sub-box">
          <InputField
            label="이메일"
            type="email"
            value={email}
            onChange={handleEmailChange}
            error={emailError}
            placeholder="이메일을 입력해주세요"
          />
          <InputField
            label="비밀번호"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={passwordError}
            placeholder="비밀번호를 입력해주세요"
          />
          <LoginButton
            isActive={isButtonActive}
            onClick={handleLoginButtonClick}
          />
          <SocialLogin />
          <SignUpLink />
        </section>
      </section>
    </main>
  );
};

export default Login;
