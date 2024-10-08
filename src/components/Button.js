import "./Button.css";

function Button({ children, clickBtn }) {
  return (
    <button onClick={clickBtn} className="page-button">
      <p>{children}</p>
    </button>
  );
}

export default Button;
