import React from "react";
import { Link } from "react-router-dom";
import "../styles/Button/Button.css";

const Button = ({ link, href, onClick, children, className, style = "" }) => {
  return link ? (
    <Link to={href} className={`btn-${className} ${style}`}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={`btn-${className} ${style}`}>
      {children}
    </button>
  );
};

export default Button;
