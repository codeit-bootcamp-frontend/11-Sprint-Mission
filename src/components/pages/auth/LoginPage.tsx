import { Link } from 'react-router-dom';
import AuthLogo from '@common/auth/AuthLogo';
import InputField from '@common/auth/InputField';
import InputPassword from '@common/auth/InputPassword';
import LoginOption from '@common/auth/LoginOption';
import '@styles/auth.css';

function LoginPage() {
  return (
    <>
      <main className='login-container auth-container'>
        <AuthLogo />
        <div className='auth-content'>
          <form className='auth-form' action='/login' method='POST'>
            <InputField
              type='email'
              text='이메일'
              placeholder='이메일을 입력해주세요'
            />
            <InputPassword
              placeholder='비밀번호를 입력해주세요'
              type='password'
            />
            <button disabled className='auth-btn' type='button'>
              로그인
            </button>
          </form>

          <LoginOption />
          <p className='auth-prompt'>
            판다마켓이 처음이신가요?
            <Link to='/signup' className='auth-link'>
              회원가입
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
