import { Link } from "react-router-dom";

function AuthLogo() {
  return (
    <Link to="/">
      <img
        id="auth-logo"
        src="/images/logos/logo-big.png"
        alt="판다마켓 로고"
      />
    </Link>
  );
}
export default AuthLogo;
