import "./PageButton.css";

function PageButton({ children, clickBtn }) {
  return (
    <button onClick={clickBtn} className="page-button">
      <div>{children}</div>
    </button>
  );
}

export default PageButton;
