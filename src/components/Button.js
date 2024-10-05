import "./Button.css";

function Button({ children, clickBtn }) {
  return <button onClick={clickBtn}>{children}</button>;
}

export default Button;
