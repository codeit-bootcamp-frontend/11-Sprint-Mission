function InputPassword({ placeholder }) {
  return (
    <div className="input-wrapper">
      <label className="auth-label" htmlFor="password">
        비밀번호
      </label>
      <div className="password-input-wrapper">
        <input
          className="auth-input"
          type="password"
          id="password"
          name="password"
          placeholder={placeholder}
        />
        <img
          src="/images/icons/password-visible.svg"
          alt="비밀번호 보기"
          className="toggle-password"
        />
      </div>
    </div>
  );
}

export default InputPassword;
