import { postSignUp, SignUpParams } from "@/api/auth.api";
import useAsync from "@/hooks/useAsync";
import setLogIn from "@/lib/setLogIn";
import styles from "@/styles/login.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useState } from "react";

const DEFAULT_VALUES: SignUpParams = {
  email: "",
  nickname: "",
  password: "",
  passwordConfirmation: "",
};

function checkValuesValid(values: SignUpParams) {
  const { email, nickname, password, passwordConfirmation } = values;
  const _email = email.trim();
  const _nickname = nickname.trim();
  const _password = password.trim();
  const _repeat = passwordConfirmation.trim();
  const regex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

  if (!regex.test(_email)) return false;
  if (_nickname.length < 1) return false;
  if (_password.length < 8) return false;
  if (_repeat.length < 8) return false;
  if (_password !== _repeat) return false;
  return true;
}

export default function SignUp() {
  const [values, setValues] = useState(DEFAULT_VALUES);
  const [valid, setValid] = useState(false);
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visibleRepeat, setVisibleRepeat] = useState(false);
  const { excute: postSignUpAsync, loading, error } = useAsync(postSignUp);
  const router = useRouter();

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

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!valid) {
      alert("허용되지 않은 명령입니다.");
      return;
    }
    const response = await postSignUpAsync(values);
    if (response) {
      setLogIn(response);
      router.push("/");
    } else alert("회원가입에 실패했습니다.");
  };

  useEffect(() => {
    setValid(checkValuesValid(values));
  }, [values]);

  return (
    <div className={styles.container}>
      <Link className={styles.logoWrap} href="/">
        <div className={styles.logoIcon}>
          <Image fill src="/images/ic_logo.svg" alt="판다마켓" />
        </div>
        <span className={styles.logoText}>판다마켓</span>
      </Link>

      <form className={styles.form} onSubmit={handleSubmit}>
        <fieldset className={styles.fieldset}>
          <label className={styles.label} htmlFor="email">
            이메일
          </label>
          <input
            className={styles.input}
            id="email"
            name="email"
            type="text"
            value={values.email}
            onChange={handleChange}
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
            value={values.nickname}
            onChange={handleChange}
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
            value={values.password}
            onChange={handleChange}
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
            name="passwordConfirmation"
            type={visibleRepeat ? "text" : "password"}
            value={values.passwordConfirmation}
            onChange={handleChange}
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
        <button className={styles.submitButton} type="submit" disabled={!valid}>
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
        <span>이미 회원이신가요?</span>
        <Link className={styles.gotoLink} href="/signin">
          로그인
        </Link>
      </div>
    </div>
  );
}
