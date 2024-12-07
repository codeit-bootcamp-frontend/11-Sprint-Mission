import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import instance from '@/pages/api/api';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/icons/ic_logo.svg';
import google from '@/public/icons/ic_google.svg';
import kakao from '@/public/icons/ic_kakao.svg';
import styles from '@/styles/JoinForm.module.css';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [formValidity, setFormValidity] = useState({
    isEmailValid: false,
    isPasswordValid: false,
  });
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const validateEmail = value => {
    const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$');
    return regex.test(value);
  };

  const validatePassword = value => value.length >= 8;

  const handleEmailBlur = () =>
    setFormValidity(prev => ({
      ...prev,
      isEmailValid: validateEmail(formData.email),
    }));

  const handlePasswordBlur = () =>
    setFormValidity(prev => ({
      ...prev,
      isPasswordValid: validatePassword(formData.password),
    }));

  useEffect(() => {
    setIsButtonEnabled(formValidity.isEmailValid && formValidity.isPasswordValid);
    const token = localStorage.getItem('accessToken');
    if (token) {
      router.push('/');
    }
  }, [formValidity, router]);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const response = await instance.post('/auth/signIn', {
        email: formData.email,
        password: formData.password,
      });
      if (!response) return;
      // 로그인 성공 시 처리
      console.log(response);
      const token = response.data.access_token;
      localStorage.setItem('token', token);
      router.push('/');
    } catch (error) {
      // 에러 처리
      console.log(error);
    }
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.joinPage}>
      <div className={styles.head}>
        <Image width={103} height={103} src={logo} alt="로고" />
        <Link href="/" className={styles.title}>
          판다마켓
        </Link>
      </div>
      <div className={styles.joinContent}>
          <div className={styles.joinMain}>
          <div className={styles.joinMain}>
              <form id="login-form" className={styles.entireForm} onSubmit={handleLogin}>
                <div>
                  <label htmlFor="input-email" className={styles.formLabel}>
                    이메일
                    <br />
                    <input
                      id="input-email"
                      className={`${styles.input} ${!formValidity.isEmailValid && formData.email ? styles.invalidMark : ''}`}
                      name="email"
                      type="email"
                      placeholder="이메일을 입력해주세요"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleEmailBlur}
                    />
                    {!formValidity.isEmailValid && formData.email && <span className={styles.invalidText}>잘못된 이메일 형식입니다.</span>}
                  </label>
                </div>
                <div>
                  <label htmlFor="input-password" className={styles.formLabel}>
                    비밀번호
                    <br />
                    <input
                      id="input-password"
                      className={`${styles.input} ${!formValidity.isPasswordValid && formData.password ? styles.invalidMark : ''}`}
                      name="password"
                      type="password"
                      placeholder="비밀번호를 입력해주세요"
                      value={formData.password}
                      onChange={handleChange}
                      onBlur={handlePasswordBlur}
                    />
                    {!formValidity.isPasswordValid && formData.password && (
                      <span className={styles.invalidText}>비밀번호는 8자 이상이어야 합니다.</span>
                    )}
                  </label>
                </div>
                <button
                  type="submit"
                  id="login-button"
                  className={`button large-button ${isButtonEnabled ? 'active' : ''}`}
                  disabled={!isButtonEnabled}
                >
                  로그인
                </button>
              </form>
            </div>
          </div>
        <aside>
          <div className={styles.simpleAuth}>
            <div className={styles.authContent}>
              간편 로그인하기
              <div className={styles.authSns}>
                <Link href="https://www.google.com/">
                  <Image src={google} alt="구글" />
                </Link>
                <Link href="https://www.kakaocorp.com/page/">
                  <Image src={kakao} alt="카카오" />
                </Link>
              </div>
            </div>
          </div>
        </aside>
        <footer>
          <div className={styles.toUs}>
            <div className={styles.usMessage}>판다마켓이 처음이신가요?</div>
            <Link href="/signup" className={styles.usLink}>
              회원가입
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
