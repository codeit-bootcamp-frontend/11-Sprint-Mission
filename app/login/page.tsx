"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../styles/sign.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const isEmailValid =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    const isPasswordValid = password.length >= 8;

    setEmailError(
      !email
        ? "이메일을 입력해 주세요"
        : isEmailValid
        ? ""
        : "잘못된 이메일 형식입니다"
    );
    setPasswordError(
      !password
        ? "비밀번호를 입력해 주세요"
        : isPasswordValid
        ? ""
        : "비밀번호를 8자 이상 입력해주세요"
    );

    setIsFormValid(isEmailValid && isPasswordValid);
  }, [email, password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      // 로그인 후 이동
      window.location.href = "/items";
    }
  };

  return (
    <section className={styles.loginHome}>
      <div
        className={styles.loginLogo}
        style={{ position: "relative", width: "150px", height: "150px" }}
      >
        <Link href="/">
          <Image
            fill
            src="/logos/panda.png"
            alt="판다"
            style={{
              objectFit: "contain",
            }}
          />
        </Link>
      </div>
      <div className={styles.info}>
        <form id="loginGeneral" onSubmit={handleSubmit}>
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
            />
            {emailError && (
              <span className={styles.formError}>{emailError}</span>
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
            />
            {passwordError && (
              <span className={styles.formError}>{passwordError}</span>
            )}
          </div>
          <button
            type="submit"
            className={styles.loginButton}
            disabled={!isFormValid}
          >
            로그인
          </button>
        </form>
      </div>
      <div className={styles.simpleLogin}>
        간편 로그인하기
        <div className="social">
          <a
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image width={42} height={42} src="/social/google.png" alt="구글" />
          </a>
          <a
            href="https://www.kakaocorp.com/page/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              width={42}
              height={42}
              src="/social/kakao.png"
              alt="카카오"
            />
          </a>
        </div>
      </div>
      <div className={styles.signup}>
        판다마켓이 처음이신가요?
        <Link href="/signup">
          <span className={styles.textDecorationUnderline}>회원가입</span>
        </Link>
      </div>
    </section>
  );
}
