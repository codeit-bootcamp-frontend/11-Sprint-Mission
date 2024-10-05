function LoginOption() {
  return (
    <>
      <div className="easy-login">
        <p className="easy-login-title">간편 로그인하기</p>
        <div className="social-icons">
          <a href="https://www.google.com/" target="_blank">
            <img src="/images/icons/ic_google.svg" alt="구글 아이콘" />
          </a>
          <a href="https://www.kakaocorp.com/page/" target="_blank">
            <img src="/images/icons/ic_kakaotalk.svg" alt="카카오톡 아이콘" />
          </a>
        </div>
      </div>

      <p className="auth-prompt">
        판다마켓이 처음이신가요?
        <a className="auth-link" href="/signup">
          회원가입
        </a>
      </p>
    </>
  );
}

export default LoginOption;
