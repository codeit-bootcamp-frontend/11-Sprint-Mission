"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "../styles/sign.module.css";
import useSign from "../hooks/useSign";
import { useState } from "react";
import SocialLogin from "../components/sign/SocialLogin";

export default function SignupPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    isFormValid,
  } = useSign();

  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [passwordRepeatError, setPasswordRepeatError] = useState("");

  const validateUsername = (value: string) => {
    setUsernameError(!value ? "닉네임을 입력해 주세요" : "");
    return !!value;
  };

  const validatePasswordRepeat = (value: string) => {
    const isValid = value === password;
    setPasswordRepeatError(
      !value
        ? "비밀번호 확인을 입력해 주세요"
        : isValid
        ? ""
        : "비밀번호가 일치하지 않습니다"
    );
    return isValid;
  };

  const handleUsernameChange = (value: string) => {
    setUsername(value);
    validateUsername(value);
  };

  const handlePasswordRepeatChange = (value: string) => {
    setPasswordRepeat(value);
    validatePasswordRepeat(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      validateUsername(username) &&
      validatePasswordRepeat(passwordRepeat) &&
      isFormValid
    ) {
      alert("회원가입 성공!");
      window.location.href = "/login";
    }
  };

  return (
    <div
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "40px",
      }}
    >
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              fill
              src="/logos/logo.png"
              alt="판다 로고"
              priority
              className={styles.loginLogo}
            />
          </Link>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.info}>
          <form id="signupGeneral" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">이메일</label>
              <br />
              <input
                id="email"
                name="email"
                placeholder="이메일을 입력해주세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className={styles.inputfield}
              />
              {emailError && (
                <span className={styles.formError}>{emailError}</span>
              )}
            </div>

            <div>
              <label htmlFor="username">닉네임</label>
              <br />
              <input
                id="username"
                name="username"
                placeholder="닉네임을 입력해주세요"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
                required
                className={styles.inputfield}
              />
              {usernameError && (
                <span className={styles.formError}>{usernameError}</span>
              )}
            </div>

            <div className={styles.passwordLabel}>
              <label htmlFor="password">비밀번호</label>
              <br />
              <input
                id="password"
                name="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={styles.inputfield}
              />
              {passwordError && (
                <span className={styles.formError}>{passwordError}</span>
              )}
            </div>

            <div className={styles.passwordRepeat}>
              <label htmlFor="passwordRepeat">비밀번호 확인</label>
              <br />
              <input
                id="passwordRepeat"
                name="passwordRepeat"
                type="password"
                placeholder="비밀번호를 다시 한 번 입력해주세요"
                value={passwordRepeat}
                onChange={(e) => handlePasswordRepeatChange(e.target.value)}
                required
                className={styles.inputfield}
              />
              {passwordRepeatError && (
                <span className={styles.formError}>{passwordRepeatError}</span>
              )}
            </div>

            <button
              type="submit"
              className={`${styles.loginButton} ${
                isFormValid ? styles.activeLoginButton : ""
              }`}
              disabled={
                !isFormValid || !username || password !== passwordRepeat
              }
            >
              회원가입
            </button>
          </form>
        </div>
        <SocialLogin />
        <div className={styles.signup}>
          이미 회원이신가요?
          <Link href="/login">
            <span className={styles.textDecorationUnderline}>로그인</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
