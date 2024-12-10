"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import styles from "../styles/sign.module.css";
import useSign from "../hooks/useSign";
import SocialLogin from "../components/sign/SocialLogin";
import { signIn } from "../lib/api/api";
import { useEffect } from "react";

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
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      router.push("/");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid) return;

    try {
      const { accessToken } = await signIn(email, password);
      localStorage.setItem("accessToken", accessToken);
      alert("로그인 성공!");
      router.push("/");
    } catch (error: any) {
      alert(error.message || "로그인 중 오류가 발생했습니다.");
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
        <SocialLogin />
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
