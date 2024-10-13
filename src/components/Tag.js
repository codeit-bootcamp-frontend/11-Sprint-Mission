import "./Tag.css";

function Tag({ children }) {
  return (
    <>
      <div className="single-tag">
        {children}
        <button className="x-button">x</button>
      </div>
    </>
  );
}
export default Tag;
