import "./SmallButton.css"

function SmallButton({ children }) {
  return (
    <>
      <button className="small-button">
        <div className="small-btn-text">{children}</div>
      </button>
    </>
  );
}

export default SmallButton;
