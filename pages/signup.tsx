import styles from "@/styles/login.module.css";
import Image from "next/image";
import Link from "next/link";
import { MouseEvent, useState } from "react";

export default function SignUp() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleRepeat, setVisibleRepeat] = useState(false);

  const handleClickVisible = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.currentTarget instanceof HTMLElement)) return;
    const name = event.currentTarget.dataset.name;
    console.log(name);
    if (name === "password") {
      setVisiblePassword((prev) => !prev);
      return;
    }
    if (name === "repeat") {
      setVisibleRepeat((prev) => !prev);
      return;
    }
  };

  return (
    <>
      <Link className={styles.logoWrap} href="/">
        <div className={styles.logoIcon}>
          <Image fill src="/images/ic_logo.svg" alt="판다마켓" />
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
          <p className={styles.alert}></p>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label} htmlFor="nickname">
            닉네임
          </label>
          <input
            className={styles.input}
            id="nickname"
            name="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요"
            required
          />
          <p className={styles.alert}></p>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label} htmlFor="password">
            비밀번호
          </label>
          <input
            className={styles.input}
            id="password"
            name="password"
            type={visiblePassword ? "text" : "password"}
            placeholder="비밀번호를 입력해주세요"
            required
          />
          <p className={styles.alert}></p>
          <div
            className={styles.visibility}
            onClick={handleClickVisible}
            data-name="password"
          >
            <div className={styles.visibilityIcon}>
              <Image
                fill
                src={`/images/ic_visibility_${
                  visiblePassword ? "on" : "off"
                }.svg`}
                alt={`비밀번호 ${visiblePassword ? "보이기" : "감추기"}`}
              />
            </div>
          </div>
        </fieldset>
        <fieldset className={styles.fieldset}>
          <label className={styles.label} htmlFor="repeat">
            비밀번호 확인
          </label>
          <input
            className={styles.input}
            id="repeat"
            name="repeat"
            type={visibleRepeat ? "text" : "password"}
            placeholder="비밀번호를 다시 한 번 입력해주세요"
            required
          />
          <p className={styles.alert}></p>
          <div
            className={styles.visibility}
            onClick={handleClickVisible}
            data-name="repeat"
          >
            <div className={styles.visibilityIcon}>
              <Image
                fill
                src={`/images/ic_visibility_${
                  visibleRepeat ? "on" : "off"
                }.svg`}
                alt={`비밀번호 ${visibleRepeat ? "보이기" : "감추기"}`}
              />
            </div>
          </div>
        </fieldset>
        <button className={styles.submitButton} type="submit">
          회원가입
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
