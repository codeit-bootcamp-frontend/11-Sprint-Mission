import InputField from "../../common/auth/InputField";
import LoginOption from "../../common/auth/LoginOption";
import InputPassword from "../../common/auth/InputPassword";
import AuthLogo from "../../common/auth/AuthLogo";
import "../../../styles/auth.css";

function SignupPage() {
  return (
    <>
      <main className="auth-container">
        <AuthLogo />
        <div className="auth-content">
          <form className="auth-form" action="/signup" method="POST">
            <InputField
              type="email"
              text="이메일"
              placeholder="이메일을 입력해주세요"
            />

            <InputField
              type="text"
              text="닉네임"
              placeholder="닉네임을 입력해주세요"
            />

            <InputPassword text="비밀번호" />

            <InputPassword
              text="비밀번호 확인"
              placeholder="비밀번호를 다시 한 번 입력해주세요"
              confirmPassword
            />

            <button className="auth-btn" type="button">
              회원가입
            </button>
          </form>

          <LoginOption />

          <p className="auth-prompt">
            이미 회원이신가요?
            <a className="auth-link" href="/pages/login.html">
              로그인
            </a>
          </p>
        </div>
      </main>
    </>
  );
}

export default SignupPage;
