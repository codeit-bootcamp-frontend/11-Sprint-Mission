import React from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

const Button = ({
  link,
  href,
  onClick,
  children,
  className,
  styleType = "",
}) => {
  return link ? (
    <Link to={href} className={`btn-${className} ${styleType}`}>
      {children}
    </Link>
  ) : (
    <button onClick={onClick} className={`btn-${className} ${styleType}`}>
      {children}
    </button>
  );
};

export default Button;
