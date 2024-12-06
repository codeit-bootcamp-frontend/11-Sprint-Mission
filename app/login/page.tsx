"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "../styles/sign.module.css";
import useSign from "../hooks/useSign";

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    emailError,
    passwordError,
    isFormValid,
  } = useSign();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      window.location.href = "/items"; // 로그인 성공 시 이동
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
      }}
    >
      <div className={styles.header}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <Image
              fill
              src="/logos/logo.png"
              alt="판다"
              priority
              className={styles.loginLogo}
            />
          </Link>
        </div>
      </div>
      <div className={styles.content}>
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
                className={styles.inputfield}
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
                className={styles.inputfield}
              />
              {passwordError && (
                <span className={styles.formError}>{passwordError}</span>
              )}
            </div>
            <button
              type="submit"
              className={`${styles.loginButton} ${
                isFormValid ? styles.activeLoginButton : ""
              }`}
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
              <Image
                width={42}
                height={42}
                src="/social/google.png"
                alt="구글"
              />
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
      </div>
    </div>
  );
}
