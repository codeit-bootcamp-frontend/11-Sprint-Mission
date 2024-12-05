import React, { useState, useEffect } from "react";
import styles from "@/styles/signup.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import logoLarge from "@/public/pngs/logo.png";
import btnOn from "@/public/svgs/btn_visibility_on_24px.svg";
import btnOff from "@/public/svgs/btn_visibility_off_24px.svg";
import kakao from "@/public/pngs/Component 3.png";
import google from "@/public/pngs/Component 2.png";
import { signUp } from "@/lib/api";

Signup.getLayout = function (page: React.ReactNode) {
  return <>{page}</>;
};

export default function Signup() {
  const router = useRouter();

  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordAgain, setPasswordAgain] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showPasswordAgain, setShowPasswordAgain] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordAgainError, setPasswordAgainError] = useState<string | null>(
    null
  );

  const [serverError, setServerError] = useState<string | null>(null);

  // 이메일 유효성 검사
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // 회원가입 버튼 활성화 여부
  const isSignupEnabled = (): boolean => {
    return (
      validateEmail(email) &&
      nickname.length > 0 &&
      password.length >= 8 &&
      password === passwordAgain
    );
  };

  // 이메일 입력 핸들러
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setEmailError(null);
  };

  // 닉네임 입력 핸들러
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setNicknameError(null);
  };

  // 비밀번호 입력 핸들러
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError(null);
  };

  // 비밀번호 확인 입력 핸들러
  const handlePasswordAgainChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordAgain(e.target.value);
    setPasswordAgainError(null);
  };

  // 이메일 포커스 아웃 핸들러
  const handleEmailBlur = () => {
    if (!email) {
      setEmailError("이메일을 입력해주세요.");
    } else if (!validateEmail(email)) {
      setEmailError("잘못된 이메일 형식입니다.");
    }
  };

  // 닉네임 포커스 아웃 핸들러
  const handleNicknameBlur = () => {
    if (!nickname) {
      setNicknameError("닉네임을 입력해주세요.");
    }
  };

  // 비밀번호 포커스 아웃 핸들러
  const handlePasswordBlur = () => {
    if (!password) {
      setPasswordError("비밀번호를 입력해주세요.");
    } else if (password.length < 8) {
      setPasswordError("비밀번호를 8자 이상 입력해주세요.");
    }
  };

  // 비밀번호 확인 포커스 아웃 핸들러
  const handlePasswordAgainBlur = () => {
    if (password !== passwordAgain) {
      setPasswordAgainError("비밀번호가 일치하지 않습니다.");
    }
  };

  // 비밀번호 보기 토글
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  // 비밀번호 확인 보기 토글
  const togglePasswordAgainVisibility = () => {
    setShowPasswordAgain((prev) => !prev);
  };

  // 회원가입 버튼 클릭 핸들러
  const handleSignup = async () => {
    if (isSignupEnabled()) {
      try {
        // 서버로 회원가입 요청
        const response = await signUp({
          email,
          nickname,
          password,
          passwordConfirmation: passwordAgain,
        });

        // accessToken 저장
        localStorage.setItem("accessToken", response.accessToken);

        // 메인 페이지로 리디렉션
        router.push("/");
      } catch (error: any) {
        setServerError(error.message);
      }
    }
  };

  return (
    <div className={styles.body_1}>
      <div className={styles.section_container}>
        <Link href="/">
          <Image src={logoLarge} alt="판다마켓 큰 로고" />
        </Link>
        <div className={styles.signup_total_container}>
          <div className={styles.signup_main}>
            <form
              className={styles.signup_main_input}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className={styles.signup_main_input_email}>
                <label className={styles.email}>이메일</label>
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
              <div className={styles.signup_main_input_nickname}>
                <label className={styles.nickname}>닉네임</label>
                <input
                  className={`${styles.nickname_input} ${
                    nicknameError ? styles.input_error : ""
                  }`}
                  type="text"
                  placeholder="닉네임을 입력해주세요."
                  value={nickname}
                  onChange={handleNicknameChange}
                  onBlur={handleNicknameBlur}
                />
                {nicknameError && (
                  <p className={styles.error_message}>{nicknameError}</p>
                )}
              </div>
              <div className={styles.signup_main_input_password}>
                <label className={styles.password}>비밀번호</label>
                <div className={styles.signup_main_input_password_container}>
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
                    className={styles.eye_icon}
                    onClick={togglePasswordVisibility}
                  >
                    <Image
                      src={showPassword ? btnOn : btnOff}
                      alt="비밀번호 보기"
                    />
                  </span>
                </div>
                {passwordError && (
                  <p className={styles.error_message}>{passwordError}</p>
                )}
              </div>
              <div className={styles.signup_main_input_password_again}>
                <label className={styles.password_again}>비밀번호 확인</label>
                <div className={styles.signup_main_input_password_container}>
                  <input
                    className={`${styles.password_again_input} ${
                      passwordAgainError ? styles.input_error : ""
                    }`}
                    type={showPasswordAgain ? "text" : "password"}
                    placeholder="비밀번호를 다시 한 번 입력해주세요."
                    value={passwordAgain}
                    onChange={handlePasswordAgainChange}
                    onBlur={handlePasswordAgainBlur}
                  />
                  <span
                    className={styles.eye_icon}
                    onClick={togglePasswordAgainVisibility}
                  >
                    <Image
                      src={showPasswordAgain ? btnOn : btnOff}
                      alt="비밀번호 보기"
                    />
                  </span>
                </div>
                {passwordAgainError && (
                  <p className={styles.error_message}>{passwordAgainError}</p>
                )}
              </div>
            </form>
            <button
              className={`${styles.signup_main_button} ${
                isSignupEnabled() ? styles.active : ""
              }`}
              disabled={!isSignupEnabled()}
              onClick={handleSignup}
            >
              회원가입
            </button>
          </div>
          <div className={styles.signup_simple_login}>
            <p className={styles.signup_simple_login_description}>
              간편 로그인하기
            </p>
            <div className={styles.signup_simple_login_link}>
              <Link href="https://www.google.com/">
                <Image src={google} alt="구글 로그인" width={40} height={40} />
              </Link>
              <Link href="https://www.kakaocorp.com/page/">
                <Image src={kakao} alt="카카오 로그인" width={40} height={40} />
              </Link>
            </div>
          </div>
          <div className={styles.signup_already}>
            <p className={styles.signup_already_question}>이미 회원이신가요?</p>
            <Link className={styles.signup_login_link} href="/login">
              로그인
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
