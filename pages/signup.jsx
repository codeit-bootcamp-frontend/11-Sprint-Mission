import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import instance from '@/pages/api/api';
import Image from 'next/image';
import Link from 'next/link';
import logo from '@/public/icons/ic_logo.svg';
import google from '@/public/icons/ic_google.svg';
import kakao from '@/public/icons/ic_kakao.svg';

export default function Signup() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    nickname: '',
    password: '',
    confirmPassword: '',
  });

  const [formValidity, setFormValidity] = useState({
    isEmailValid: false,
    isNicknameValid: false,
    isPasswordValid: false,
    isPasswordMatch: false,
  });

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  const validateEmail = value => {
    const regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$');
    return regex.test(value);
  };

  const validatePassword = value => value.length >= 8;

  const validateNickname = value => value.trim() !== '';

  const handleEmailBlur = () =>
    setFormValidity(prev => ({
      ...prev,
      isEmailValid: validateEmail(formData.email),
    }));

  const handleNicknameBlur = () =>
    setFormValidity(prev => ({
      ...prev,
      isNicknameValid: validateNickname(formData.nickname),
    }));

  const handlePasswordBlur = () =>
    setFormValidity(prev => ({
      ...prev,
      isPasswordValid: validatePassword(formData.password),
    }));

  const handleConfirmPasswordBlur = () =>
    setFormValidity(prev => ({
      ...prev,
      isPasswordMatch: formData.password === formData.confirmPassword,
    }));

  useEffect(() => {
    setIsButtonEnabled(formValidity.isEmailValid && formValidity.isNicknameValid && formValidity.isPasswordValid && formValidity.isPasswordMatch);
    const token = localStorage.getItem('accessToken');
    if (token) {
      router.push('/');
    }
  }, [formValidity, router]);

  const handleSignup = async e => {
    e.preventDefault();
    console.log('회원가입 요청 시작');
    try {
      const response = await instance.post('/auth/signUp', {
        email: formData.email,
        nickname: formData.nickname,
        password: formData.password,
        passwordConfirmation: formData.confirmPassword,
      });

      // API 성공 응답 처리
      console.log('회원가입 성공:', response.data);
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      alert('회원가입이 완료되었습니다! 🎉');
      router.push('/login');
    } catch (error) {
      console.error('회원가입에 실패했습니다:', error.response?.data || error.message);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
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
      <div className="join-page">
        <div className="join-page-header">
          <div className="head">
            <Image src={logo} alt="로고" />
            <Link href="/" className="title">
              판다마켓
            </Link>
          </div>
        </div>
        <div className="join-content">
          <main>
            <div className="join-main">
              <div className="join">
                <form id="signup-form" className="form">
                  <div className="email-form">
                    <label htmlFor="signup-email" className="email-form__input">
                      이메일
                      <br />
                      <input
                        id="signup-email"
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
                  <div className="nickname-form">
                    <label htmlFor="signup-nickname" className="input">
                      닉네임
                      <br />
                      <input
                        id="signup-nickname"
                        className="input"
                        name="nickname"
                        type="text"
                        placeholder="닉네임을 입력해주세요"
                        value={formData.nickname}
                        onChange={handleChange}
                        onBlur={handleNicknameBlur}
                      />
                      {!formValidity.isNicknameValid && formData.nickname && <span className="invalid-text">닉네임을 입력해주세요.</span>}
                    </label>
                  </div>
                  <div className="password-form">
                    <label htmlFor="signup-password" className="password-form__input">
                      비밀번호
                      <br />
                      <input
                        id="signup-password"
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
                  <div className="password-form">
                    <label htmlFor="checkout-password" className="password-form__input">
                      비밀번호 확인
                      <br />
                      <input
                        id="checkout-password"
                        className={`input ${!formValidity.isPasswordMatch && formData.confirmPassword ? 'invalid-mark' : ''}`}
                        name="confirmPassword"
                        type="password"
                        placeholder="비밀번호를 다시 한 번 입력해주세요"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleConfirmPasswordBlur}
                      />
                      {!formValidity.isPasswordMatch && formData.confirmPassword && (
                        <span className="invalid-text">비밀번호가 일치하지 않습니다.</span>
                      )}
                    </label>
                  </div>
                </form>
              </div>
              <button
                type="submit"
                id="signup-button"
                className={`button large-button ${isButtonEnabled ? 'active' : ''}`}
                disabled={!isButtonEnabled}
                onClick={handleSignup}
              >
                회원가입
              </button>
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
              <div className="us-message">이미 회원이신가요?</div>
              <Link href="/login" className="us-link">
                로그인
              </Link>
            </div>
          </footer>
        </div>
      </div>
  );
}
