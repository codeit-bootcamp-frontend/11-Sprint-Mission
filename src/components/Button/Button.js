import "./Button.css";
import { Link } from "react-router-dom";

export function LoginButton({ text }) {
  return (
    <Link to="/login" className="loginButton button">
      {text}123
    </Link>
  );
}

export function HeroButton({ text }) {
  return (
    <Link to="/items" className="pillButton button">
      {text}
    </Link>
  );
}
