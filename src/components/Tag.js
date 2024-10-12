import "./Tag.css";
import x from "../assets/ic_X.svg";

function Tag({ children }) {
  return (
    <>
      <button>
        {children}
        <img src={x} className="x" alt="태그삭제" />
      </button>
    </>
  );
}
export default Tag;
