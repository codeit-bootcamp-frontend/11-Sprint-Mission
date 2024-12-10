import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/login.module.css";
import Image from "next/image";
import logoLarge from "@/public/pngs/logo.png";
import btnOn from "@/public/svgs/btn_visibility_on_24px.svg";
import btnOff from "@/public/svgs/btn_visibility_off_24px.svg";
import kakao from "@/public/pngs/Component_3.png";
import google from "@/public/pngs/Component_2.png";
import Link from "next/link";
import { signIn } from "@/lib/api";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      router.push("/"); // 토큰이 있는 경우 홈으로 리디렉션
    }
  }, [router]);

  // 이메일 유효성 검증 함수
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 로그인 버튼 활성화 여부 판단
  const isLoginEnabled: boolean = validateEmail(email) && password.length >= 8;

  // 이메일 입력 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(null); // 에러 초기화
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(null); // 에러 초기화
  };

  // 이메일 입력 필드 포커스 아웃 핸들러
  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
    } else if (!validateEmail(email)) {
      setEmailError("잘못된 이메일 형식입니다.");
    }
  };

  // 비밀번호 입력 필드 포커스 아웃 핸들러
  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    } else if (password.length < 8) {
      setPasswordError("비밀번호를 8자 이상 입력해주세요.");
    }
  };

  // 로그인 버튼 클릭 핸들러
  const handleLogin = async () => {
    if (isLoginEnabled) {
      try {
        // 서버로 로그인 요청
        const response = await signIn({ email, password });

        // accessToken 저장
        localStorage.setItem("accessToken", response.accessToken);

        // 메인 페이지로 리디렉션
        router.push("/");
      } catch (error: any) {
        // 서버 에러 처리
        setServerError(error.message || "로그인에 실패했습니다.");
      }
    }
  };

  // 비밀번호 보기 토글 핸들러
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className={styles.body}>
      <div className={styles.section_container}>
        <Link href="/">
          <Image
            className={styles.big_logo}
            src={logoLarge}
            alt="판다마켓 큰 로고"
          />
        </Link>
        <div className={styles.login_total_container}>
          <div className={styles.login_main}>
            <form
              className={styles.login_main_input}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className={styles.login_main_input_email}>
                <label htmlFor="email-input">이메일</label>
                <input
                  className={`${styles.email_input} ${
                    emailError ? styles.input_error : ""
                  }`}
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                />
                {emailError && (
                  <p className={styles.error_message}>{emailError}</p>
                )}
              </div>
              <div className={styles.login_main_input_password}>
                <label className={styles.password}>비밀번호</label>
                <div className={styles.login_main_input_password_container}>
                  <input
                    className={`${styles.password_input} ${
                      passwordError ? styles.input_error : ""
                    }`}
                    type={showPassword ? "text" : "password"}
                    placeholder="비밀번호를 입력해주세요."
                    value={password}
                    onChange={handlePasswordChange}
                    onBlur={handlePasswordBlur}
                  />
                  <span
                    id="toggle-password"
                    className={styles.eye_icon}
                    onClick={togglePasswordVisibility}
                  >
                    <Image
                      id="eye-icon"
                      src={showPassword ? btnOn : btnOff}
                      alt="비밀번호 보기"
                    />
                  </span>
                </div>
                {passwordError && (
                  <p className={styles.error_message}>{passwordError}</p>
                )}
              </div>
            </form>
            <button
              className={`${styles.login_main_button} ${
                isLoginEnabled ? styles.active : ""
              }`}
              disabled={!isLoginEnabled}
              onClick={handleLogin}
            >
              로그인
            </button>
          </div>
          <div className={styles.login_simple_login}>
            <div className={styles.login_simple_login_container}>
              <p className={styles.login_simple_login_description}>
                간편 로그인하기
              </p>
              <div className={styles.login_simple_login_link}>
                <a href="https://www.google.com/">
                  <Image
                    className={styles.google}
                    src={google}
                    alt="구글 로그인"
                  />
                </a>
                <a href="https://www.kakaocorp.com/page/">
                  <Image
                    className={styles.kakao}
                    src={kakao}
                    alt="카카오 로그인"
                  />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.login_first}>
            <p className={styles.login_signup_question}>
              판다마켓이 처음이신가요?
            </p>
            <Link className={styles.login_signup_link} href="/signup">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
