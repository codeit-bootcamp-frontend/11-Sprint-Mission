import React from "react";
import { Link } from "react-router-dom";
import "./SignUpLink.css";

const SignUpLink = () => {
  return (
    <p className="to-signup">
      판다마켓이 처음이신가요?
      <Link to="/register">
        <p className="to-signup-link">회원가입</p>
      </Link>
    </p>
  );
};

export default SignUpLink;
