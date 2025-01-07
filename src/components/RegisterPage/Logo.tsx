import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/image/Property 1=lg.png";
import "./Logo.css";

const Logo = () => {
  return (
    <section className="main-box-logo">
      <Link to="/">
        <img className="login-logo" src={logo} alt="판다마켓" />
      </Link>
    </section>
  );
};

export default Logo;
