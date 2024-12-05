'use client';

import React, { useState, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import logo from '../../assets/logo/logo.svg';
import eyeVariant from '../../assets/input-icon/Property 1=Variant2.svg';
import eyeDefault from '../../assets/input-icon/Property 1=Default.svg';
import google from '../../assets/login-icon/goolge.svg';
import kakao from '../../assets/login-icon/kakao.svg';
import styles from '../../styles/login.module.css';

const Login = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(
      !value
        ? '이메일을 입력해주세요.'
        : !emailPattern.test(value)
        ? '잘못된 이메일 형식입니다.'
        : ''
    );
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(
      !value
        ? '비밀번호를 입력해주세요.'
        : value.length < 8
        ? '비밀번호를 8자 이상 입력해주세요.'
        : ''
    );
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  const isFormValid = emailPattern.test(email) && password.length >= 8;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormValid) alert('로그인 성공!');
    else alert('로그인 정보를 확인해주세요.');
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit}>
      <a href="/">
        <Image className={styles.loginLogo} src={logo} alt="login-logo" />
      </a>
      <section>
        <div className={styles.inputArea}>
          <label htmlFor="email" className={styles.label}>
            이메일
          </label>
          <br />
          <input
            id="email"
            name="useremail"
            type="email"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={handleEmailChange}
            className={`${styles.input} ${emailError ? styles.error : ''}`}
          />
          {emailError && (
            <div className={styles.errorMessage}>{emailError}</div>
          )}
        </div>
        <div className={styles.inputArea}>
          <label htmlFor="password" className={styles.label}>
            비밀번호
          </label>
          <div className={styles.inputContainer}>
            <input
              id="password"
              name="userpassword"
              type={passwordVisible ? 'text' : 'password'}
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={handlePasswordChange}
              className={`${styles.input} ${passwordError ? styles.error : ''}`}
            />
            <Image
              className={styles.eyeIcon}
              src={passwordVisible ? eyeDefault : eyeVariant}
              alt="Toggle password visibility"
              onClick={togglePasswordVisibility}
            />
          </div>
          {passwordError && (
            <div className={styles.errorMessage}>{passwordError}</div>
          )}
        </div>
        <button
          type="submit"
          className={`${styles.loginBtn} ${
            isFormValid ? styles.loginBtnActive : ''
          }`}
          disabled={!isFormValid}
        >
          로그인
        </button>
        <div className={styles.simpleLogin}>
          <div className={styles.simpleLoginInner}>
            <p>간편 로그인하기</p>
            <div className={styles.loginIcon}>
              <a href="https://www.google.com/">
                <Image src={google} alt="google" layout="responsive" />
              </a>
              <a href="https://www.kakaocorp.com/page/">
                <Image src={kakao} alt="kakao" layout="responsive" />
              </a>
            </div>
          </div>
        </div>
        <p className={styles.firstUser}>
          판다마켓이 처음이신가요? <a href="/signup">회원가입</a>
        </p>
      </section>
    </form>
  );
};

export default Login;
