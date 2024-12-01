import styles from "@/styles/login.module.css";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
  const [visible, setVisible] = useState(false);
  const [valid, setValid] = useState(false);

  const handleClickVisible = () => {
    setVisible((prev) => !prev);
  };

  return (
    <>
      <Link className={styles.logoWrap} href="/">
        <div className={styles.logoIcon}>
          <Image fill src="/images/ic_logo.svg" alt="로고 이미지" />
        </div>
        <span className={styles.logoText}>판다마켓</span>
      </Link>

      <form className={styles.form}>
        <fieldset className={styles.fieldset}>
          <label className={styles.label} htmlFor="email">
            이메일
          </label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="text"
            placeholder="이메일을 입력해주세요"
            required
          />
          <p className="input-alert"></p>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <label className={styles.label} htmlFor="password">
            비밀번호
          </label>
          <input
            className={styles.input}
            id="password"
            name="password"
            type={visible ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
            required
          />
          <div className={styles.visibility} onClick={handleClickVisible}>
            <div className={styles.visibilityIcon}>
              <Image
                fill
                src={`/images/ic_visibility_${visible ? "on" : "off"}.svg`}
                alt={`비밀번호 ${visible ? "보이기" : "감추기"}`}
              />
            </div>
          </div>
          <p className={styles.alert}></p>
        </fieldset>
        <button className={styles.submitButton} type="submit" disabled={!valid}>
          로그인
        </button>
      </form>

      <div className={styles.social}>
        <p className={styles.socialText}>간편 로그인하기</p>
        <Link className={styles.socialButton} href="https://www.google.com/">
          <Image fill src="/images/ic_google.svg" alt="구글 소셜 로그인 버튼" />
        </Link>
        <Link
          className={styles.socialButton}
          href="https://www.kakaocorp.com/page/"
        >
          <Image
            fill
            src="/images/ic_kakao.svg"
            alt="카카오 소셜 로그인 버튼"
          />
        </Link>
      </div>

      <div className={styles.goto}>
        <span>판다마켓이 처음이신가요?</span>
        <Link className={styles.gotoLink} href="/signup">
          회원가입
        </Link>
      </div>
    </>
  );
}
