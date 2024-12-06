import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import instance from '@/pages/api/api';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/icons/ic_logo.svg';
import google from '@/public/icons/ic_google.svg';
import kakao from '@/public/icons/ic_kakao.svg';

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
    <>
      <div className="join-page">
        <header>
          <div className="head">
            <Image src={logo} alt="로고" />
            <Link href="/" className="title">
              판다마켓
            </Link>
          </div>
        </header>
        <div className="join-content">
          <main>
            <div className="join-main">
              <div className="join">
                <form id="login-form" className="form" onSubmit={handleLogin}>
                  <div className="email-form">
                    <label htmlFor="input-email" className="email-form__input">
                      이메일
                      <br />
                      <input
                        id="input-email"
                        className={`input ${!formValidity.isEmailValid && formData.email ? 'invalid-mark' : ''}`}
                        name="email"
                        type="email"
                        placeholder="이메일을 입력해주세요"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleEmailBlur}
                      />
                      {!formValidity.isEmailValid && formData.email && <span className="invalid-text">잘못된 이메일 형식입니다.</span>}
                    </label>
                  </div>
                  <div className="password-form">
                    <label htmlFor="input-password" className="password-form__input">
                      비밀번호
                      <br />
                      <input
                        id="input-password"
                        className={`input ${!formValidity.isPasswordValid && formData.password ? 'invalid-mark' : ''}`}
                        name="password"
                        type="password"
                        placeholder="비밀번호를 입력해주세요"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handlePasswordBlur}
                      />
                      {!formValidity.isPasswordValid && formData.password && <span className="invalid-text">비밀번호는 8자 이상이어야 합니다.</span>}
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
          </main>
          <aside>
            <div className="simple-auth">
              <div className="auth-content">
                간편 로그인하기
                <div className="auth-sns">
                  <Link href="https://www.google.com/" className="auth-sns__icon">
                    <Image src={google} alt="구글" />
                  </Link>
                  <Link href="https://www.kakaocorp.com/page/" className="auth-sns__icon">
                    <Image src={kakao} alt="카카오" />
                  </Link>
                </div>
              </div>
            </div>
          </aside>
          <footer>
            <div className="to-us">
              <div className="us-message">판다마켓이 처음이신가요?</div>
              <Link href="/signup" className="us-link">
                회원가입
              </Link>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
