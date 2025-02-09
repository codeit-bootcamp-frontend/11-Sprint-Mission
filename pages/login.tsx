import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthProvider';
import { useRouter } from 'next/router';
import styles from '@styles/Login.module.css';
import Image from 'next/image';
import Link from 'next/link';

interface LoginFormState {
  email: string;
  password: string;
}

interface ValidationState {
  email: boolean;
  password: boolean;
  form: boolean;
}

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function LoginPage() {
  const [formData, setFormData] = useState<LoginFormState>({
    email: '',
    password: '',
  });

  const [validation, setValidation] = useState<ValidationState>({
    email: true,
    password: true,
    form: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      router.replace('/');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  useEffect(() => {
    const isEmailValid = validateEmail(formData.email);
    const isPasswordValid = formData.password.length >= 8;

    setValidation({
      email: isEmailValid || formData.email === '',
      password: isPasswordValid || formData.password === '',
      form: isEmailValid && isPasswordValid,
    });
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validation.form) {
      try {
        await login({ email: formData.email, password: formData.password });
        router.push('/');
      } catch (error) {
        if (error instanceof Error) {
          alert(error.message);
        } else {
          alert('알 수 없는 에러가 발생했습니다.');
        }
      }
    }
  };

  if (isCheckingAuth) {
    return null;
  }

  return (
    <div className={styles['login-page']}>
      <Link href="/">
        <Image
          src="/pngs/ic_Pandalogo.png"
          alt="판다마켓 로고"
          width={396}
          height={132}
        />
      </Link>
      <div className={styles['sign']}>
        <form className={styles['sign-form']} onSubmit={handleSubmit}>
          <div className={styles['sign-input']}>
            <label className={styles['sign-label']}>이메일</label>
            <input
              className={`${styles['input-area']} ${
                !validation.email ? styles['error'] : ''
              }`}
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {!validation.email && formData.email && (
            <div className={styles['failure-message']}>
              잘못된 이메일 형식입니다.
            </div>
          )}
          <div className={styles['sign-input']}>
            <label className={styles['sign-label']}>비밀번호</label>
            <div className={styles['input-wrapper']}>
              <input
                className={`${styles['input-area']} ${
                  !validation.password ? styles['error'] : ''
                }`}
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="비밀번호를 입력해주세요"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles['toggle-password-btn']}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <Image
                  className={styles['toggle-password']}
                  src={`/pngs/${
                    showPassword
                      ? 'btn_visibility_off.png'
                      : 'btn_visibility_on.png'
                  }`}
                  alt="비밀번호 보기"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
          {!validation.password && formData.password && (
            <div className={styles['pw-failure-message']}>
              비밀번호를 8자 이상 입력해주세요.
            </div>
          )}
          <div className={styles['submit']}>
            <button
              className={`${styles['sign-button']} ${
                validation.form ? styles['active'] : ''
              }`}
              type="submit"
              disabled={!validation.form}
            >
              로그인
            </button>
          </div>
        </form>
        <div className={styles['outer']}>
          간편 로그인하기
          <div className={styles['social']}>
            <Link href="https://www.google.com/">
              <Image
                src="/pngs/ic_google.png"
                alt="구글"
                width={42}
                height={42}
              />
            </Link>
            <Link href="https://www.kakaocorp.com/page/">
              <Image
                src="/pngs/ic_kakao.png"
                alt="카카오"
                width={42}
                height={42}
              />
            </Link>
          </div>
        </div>
        <div className={styles['login-footer']}>
          판다마켓이 처음이신가요?
          <Link className={styles['link-signup']} href="./signup">
            회원가입
          </Link>
        </div>
      </div>
    </div>
  );
}
