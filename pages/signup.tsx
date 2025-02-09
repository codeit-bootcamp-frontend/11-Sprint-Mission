import { useEffect, useState } from 'react';
import styles from '@styles/Signup.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axiosInstance from '@/lib/axiosInstance';

interface SignupFormState {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

interface ValidationState {
  email: boolean;
  password: boolean;
  passwordConfirmation: boolean;
  form: boolean;
}

const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState<SignupFormState>({
    email: '',
    nickname: '',
    password: '',
    passwordConfirmation: '',
  });

  const [validation, setValidation] = useState<ValidationState>({
    email: true,
    password: true,
    passwordConfirmation: true,
    form: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      router.replace('/');
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  useEffect(() => {
    const emailValid = validateEmail(formData.email);
    const passwordValid = formData.password.length >= 8;
    const confirmPasswordValid =
      formData.password === formData.passwordConfirmation;

    setValidation({
      email: emailValid || formData.email === '',
      password: passwordValid || formData.password === '',
      passwordConfirmation:
        confirmPasswordValid || formData.passwordConfirmation === '',
      form: emailValid && passwordValid && confirmPasswordValid,
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
        await axiosInstance.post('/auth/signUp', formData);

        alert('회원가입이 완료되었습니다.');
        router.push('/login');
      } catch (error) {
        console.error('회원가입 실패:', error);
        throw new Error('회원가입에 실패했습니다.');
      }
    }
  };

  if (isCheckingAuth) {
    return null;
  }

  return (
    <div className={styles['signup-page']}>
      <Link href="/">
        <Image
          src="/pngs/ic_Pandalogo.png"
          alt="판다마켓 로고"
          width={396}
          height={132}
          className={styles['signup-image']}
        />
      </Link>
      <div className={styles['sign']}>
        <form className={styles['sign-form']} onSubmit={handleSubmit}>
          <div className={styles['sign-input']}>
            <label className={styles['sign-label']}>이메일</label>
            <input
              className={`${styles['input-area']} ${
                !validation.email && formData.email ? styles['error'] : ''
              }`}
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              value={formData.email}
              onChange={handleChange}
            />
            {!validation.email && formData.email && (
              <div className={styles['failure-message']}>
                잘못된 이메일 형식입니다.
              </div>
            )}
          </div>
          <div className={styles['sign-input']}>
            <label className={styles['sign-label']}>닉네임</label>
            <input
              className={styles['input-area']}
              type="text"
              name="nickname"
              placeholder="닉네임을 입력해주세요"
              value={formData.nickname}
              onChange={handleChange}
            />
          </div>
          <div className={styles['sign-input']}>
            <label className={styles['sign-label']}>비밀번호</label>
            <div className={styles['input-wrapper']}>
              <input
                className={`${styles['input-area']} ${
                  !validation.password && formData.password
                    ? styles['error']
                    : ''
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
                  src={`/pngs/${
                    showPassword
                      ? 'btn_visibility_off.png'
                      : 'btn_visibility_on.png'
                  }`}
                  className={styles['toggle-password']}
                  alt="비밀번호 보기"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            {!validation.password && formData.password && (
              <div className={styles['failure-message']}>
                비밀번호는 8자 이상이어야 합니다.
              </div>
            )}
          </div>
          <div className={styles['sign-input']}>
            <label className={styles['sign-label']}>비밀번호 확인</label>
            <div className={styles['input-wrapper']}>
              <input
                className={`${styles['input-area']} ${
                  !validation.passwordConfirmation &&
                  formData.passwordConfirmation
                    ? styles['error']
                    : ''
                }`}
                type={showConfirmPassword ? 'text' : 'password'}
                name="passwordConfirmation"
                placeholder="비밀번호를 다시 입력해주세요"
                value={formData.passwordConfirmation}
                onChange={handleChange}
              />
              <button
                type="button"
                className={styles['toggle-password-btn']}
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                <Image
                  src={`/pngs/${
                    showConfirmPassword
                      ? 'btn_visibility_off.png'
                      : 'btn_visibility_on.png'
                  }`}
                  className={styles['toggle-password']}
                  alt="비밀번호 보기"
                  width={24}
                  height={24}
                />
              </button>
            </div>
            {!validation.passwordConfirmation &&
              formData.passwordConfirmation && (
                <div className={styles['failure-message']}>
                  비밀번호가 일치하지 않습니다.
                </div>
              )}
          </div>
          <div className={styles['submit']}>
            <button
              className={`${styles['sign-button']} ${
                validation.form ? styles['active'] : ''
              }`}
              type="submit"
              disabled={!validation.form}
            >
              회원가입
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
        <div className={styles['signup-footer']}>
          이미 회원이신가요?{' '}
          <Link className={styles['link-signup']} href="./login">
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
}
