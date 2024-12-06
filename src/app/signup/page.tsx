'use client';

import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import logo from '../../assets/logo/logo.svg';
import eyeVariant from '../../assets/input-icon/Property 1=Variant2.svg';
import eyeDefault from '../../assets/input-icon/Property 1=Default.svg';
import google from '../../assets/login-icon/goolge.svg';
import kakao from '../../assets/login-icon/kakao.svg';
import styles from '../../styles/signup.module.css';
import { signup, isLoggedIn } from '../../hooks/api';

const Signup = (): JSX.Element => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVerify, setPasswordVerify] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordVerifyError, setPasswordVerifyError] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVerifyVisible, setPasswordVerifyVisible] = useState(false);

  const router = useRouter();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  useEffect(() => {
    // accessToken이 있다면 메인 페이지로 이동
    if (isLoggedIn()) {
      router.push('/');
    }
  }, [router]);

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

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    setUsernameError(!value ? '닉네임을 입력해주세요.' : '');
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

  const handlePasswordVerifyChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordVerify(value);
    setPasswordVerifyError(
      value !== password ? '비밀번호가 일치하지 않습니다.' : ''
    );
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const togglePasswordVerifyVisibility = () =>
    setPasswordVerifyVisible(!passwordVerifyVisible);

  const isFormValid =
    emailPattern.test(email) &&
    username.trim() !== '' &&
    password.length >= 8 &&
    password === passwordVerify;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isFormValid) {
      try {
        const payload = {
          email,
          nickname: username,
          password,
          passwordConfirmation: passwordVerify,
        };

        const { accessToken } = await signup(payload);

        // accessToken을 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);

        router.push('/');
      } catch (error: any) {
        console.error('회원가입 중 오류 발생:', error);
        alert(error.message || '회원가입에 실패했습니다. 다시 시도해주세요.');
      }
    } else {
      alert('입력 정보를 확인해주세요.');
    }
  };

  return (
    <form className={styles.signup} onSubmit={handleSubmit}>
      <a href="/">
        <Image className={styles.signupLogo} src={logo} alt="signup-logo" />
      </a>
      <section className={styles.signupMain}>
        <div className={styles.inputArea}>
          <label htmlFor="email">이메일</label>
          <br />
          <input
            id="email"
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
          <label htmlFor="username">닉네임</label>
          <br />
          <input
            id="username"
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={username}
            onChange={handleUsernameChange}
            className={`${styles.input} ${usernameError ? styles.error : ''}`}
          />
          {usernameError && (
            <div className={styles.errorMessage}>{usernameError}</div>
          )}
        </div>
        <div className={styles.inputArea}>
          <label htmlFor="password">비밀번호</label>
          <div className={styles.inputContainer}>
            <input
              id="password"
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
        <div className={styles.inputArea}>
          <label htmlFor="passwordVerify">비밀번호 확인</label>
          <div className={styles.inputContainer}>
            <input
              id="passwordVerify"
              type={passwordVerifyVisible ? 'text' : 'password'}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              value={passwordVerify}
              onChange={handlePasswordVerifyChange}
              className={`${styles.input} ${
                passwordVerifyError ? styles.error : ''
              }`}
            />
            <Image
              className={styles.eyeIcon}
              src={passwordVerifyVisible ? eyeDefault : eyeVariant}
              alt="Toggle password visibility"
              onClick={togglePasswordVerifyVisibility}
            />
          </div>
          {passwordVerifyError && (
            <div className={styles.errorMessage}>{passwordVerifyError}</div>
          )}
        </div>
        <button
          type="submit"
          className={`${styles.signupBtn} ${isFormValid ? styles.active : ''}`}
          disabled={!isFormValid}
        >
          회원가입
        </button>
        <div className={styles.simpleLogin}>
          <div className={styles.simpleLoginInner}>
            <p>간편 로그인하기</p>
            <div className={styles.signupIcon}>
              <a href="https://www.google.com/">
                <Image src={google} alt="google" />
              </a>
              <a href="https://www.kakaocorp.com/page/">
                <Image src={kakao} alt="kakao" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
};

export default Signup;
