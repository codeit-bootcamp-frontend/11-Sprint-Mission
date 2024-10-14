import "./Tag.css";
import x from "../assets/ic_x.svg";

function Tag({ children }) {
  return (
    <>
      <div className="single-tag">
        <div className="tag-content">
          <p>{children}</p>
          <button className="x-button">
            <img src={x} alt="태그삭제" />
          </button>
        </div>
      </div>
    </>
  );
}
export default Tag;
