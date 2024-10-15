import "./SmallButton.css"

function SmallButton({ children }) {
  return (
    <>
      <button className="small-button">
        <p className="small-btn-text">{children}</p>
      </button>
    </>
  );
}

export default SmallButton;
