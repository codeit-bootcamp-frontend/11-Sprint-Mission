import React from "react";
import "./SocialLogin.css";
import googleLogo from "../../assets/image/gnb/Component 2.png";
import kakaoLogo from "../../assets/image/gnb/Component 3.png";

const SocialLogin = () => {
  return (
    <div className="comport-login">
      <p className="comport-login-link">간편 로그인하기</p>
      <div>
        <a href="https://www.google.com">
          <img
            className="login-image google"
            src={googleLogo}
            alt="구글 로그인"
          />
        </a>
        <a href="https://www.kakaocorp.com/page">
          <img className="login-image" src={kakaoLogo} alt="카카오톡 로그인" />
        </a>
      </div>
    </div>
  );
};

export default SocialLogin;
