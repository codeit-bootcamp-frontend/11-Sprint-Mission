import "./Button.css";
import Login from "../../pages/login/login";

function LoginButton() {
  return (
    <a src={Login} className="LoginButton">
      로그인
    </a>
  ); // 테두리가 생김
}

export default LoginButton;
