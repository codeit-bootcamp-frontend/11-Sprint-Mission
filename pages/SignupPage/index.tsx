import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import styles from "@/styles/LoginPage.module.css";

// 이미지 파일 import
import Logo from "../../public/images/logo.svg";
import GoogleIcon from "../../public/images/google.png";
import KakaoIcon from "../../public/images/kakao.png";
import EyeOpenIcon from "../../public/images/eyeo.svg";
import EyeClosedIcon from "../../public/images/eyex.svg";

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

  const handleSubmit = (e: React.FormEvent) => {
    // HTML 폼 요소)에서 발생하는 이벤트 객체
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", { email, nickname, password });
      // Handle form submission
    }
  };

  return (
    <div className={styles.sign_div}>
      <div className={styles.logo_home}>
        <Link href="/">
          <Image src={Logo} alt="판다마켓 홈" className={styles.logo_img} />
        </Link>
      </div>
      <form
        className={`${styles.signinup} ${styles.signupForm}`}
        onSubmit={handleSubmit}
      >
        {/* 이메일 */}
        <div className={styles.input_item}>
          <label className={styles.lagel} htmlFor="email">
            이메일
          </label>
          <input
            className={styles.input}
            id="email"
            type="email"
            placeholder="이메일을 입력해 주세요."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <span className={styles.error_message}>{errors.email}</span>
          )}
        </div>

        {/* 닉네임 */}
        <div className={styles.input_item}>
          <label className={styles.label} htmlFor="nickname">
            닉네임
          </label>
          <input
            className={styles.input}
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해 주세요."
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
          {errors.nickname && (
            <span className={styles.error_message}>{errors.nickname}</span>
          )}
        </div>

        {/* 비밀번호 */}
        <div className={styles.input_item}>
          <label className={styles.label} htmlFor="password">
            비밀번호
          </label>
          <div className={styles.input_div}>
            <input
              className={styles.input}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호를 입력해 주세요."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Image
              src={showPassword ? EyeOpenIcon : EyeClosedIcon}
              alt={showPassword ? "비밀번호 표시" : "비밀번호 숨김"}
              className={styles.toggle_pwd}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {errors.password && (
            <span className={styles.error_message}>{errors.password}</span>
          )}
        </div>

        {/* 비밀번호 확인 */}
        <div className={styles.input_item}>
          <label className={styles.label} htmlFor="passwordCheck">
            비밀번호 확인
          </label>
          <div className={styles.input_div}>
            <input
              className={styles.input}
              id="passwordCheck"
              type={showPasswordCheck ? "text" : "password"}
              placeholder="비밀번호를 다시 한 번 입력해 주세요."
              value={passwordCheck}
              onChange={(e) => setPasswordCheck(e.target.value)}
            />
            <Image
              src={showPasswordCheck ? EyeOpenIcon : EyeClosedIcon}
              alt={showPasswordCheck ? "비밀번호 표시" : "비밀번호 숨김"}
              className={styles.toggle_pwd}
              onClick={() => setShowPasswordCheck(!showPasswordCheck)}
            />
          </div>
          {errors.passwordCheck && (
            <span className={styles.error_message}>{errors.passwordCheck}</span>
          )}
        </div>

        <button
          type="submit"
          // className={`button signupBtn ${
          //   email && nickname && password && passwordCheck ? "active" : ""
          // }`}
          className={`${styles.button} ${styles.signupBtn} ${
            email && nickname && password && passwordCheck ? styles.active : ""
          }`}
          disabled={!email || !nickname || !password || !passwordCheck}
        >
          회원가입
        </button>
      </form>

      <div className={styles.social_login_div}>
        <h3>간편 로그인하기</h3>
        <div className="social_login_buttons_div">
          <Link href="https://www.google.com/" target="_blank" rel="noreferrer">
            <Image
              src={GoogleIcon}
              alt="구글 로그인"
              className={styles.icon_img}
            />
          </Link>
          <a
            href="https://www.kakaocorp.com/page/"
            target="_blank"
            rel="noreferrer"
          >
            <Image
              src={KakaoIcon}
              alt="카카오톡 로그인"
              className={styles.icon_img}
            />
          </a>
        </div>
      </div>

      <div className={styles.signup_switch}>
        이미 회원이신가요? <a href="/login">로그인</a>
      </div>
    </div>
  );
};

export default Signup;
