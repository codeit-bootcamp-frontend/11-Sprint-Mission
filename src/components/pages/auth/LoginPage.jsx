import InputField from "../../common/auth/InputField";
import LoginOption from "../../common/auth/LoginOption";
import InputPassword from "../../common/auth/InputPassword";
import AuthLogo from "../../common/auth/AuthLogo";
import "../../../styles/auth.css";

function LoginPage() {
  return (
    <>
      <main className="login-container auth-container">
        <AuthLogo />
        <div className="auth-content">
          <form className="auth-form" action="/login" method="POST">
            <InputField
              type="email"
              text="이메일"
              placeholder="이메일을 입력해주세요"
            />
            <InputPassword />
            <button disabled="true" className="auth-btn" type="button">
              로그인
            </button>
          </form>

          <LoginOption />
          <p className="auth-prompt">
            판다마켓이 처음이신가요?
            <a className="auth-link" href="/signup">
              회원가입
            </a>
          </p>
        </div>
      </main>
    </>
  );
}

export default LoginPage;
