import "./PageButton.css";

function PageButton({ children, clickBtn }) {
  return (
    <button onClick={clickBtn} className="page-button">
      <p>{children}</p>
    </button>
  );
}

export default PageButton;
