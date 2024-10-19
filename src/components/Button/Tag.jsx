import "./Tag.css";
import XBtn from "../../assets/icons/ic_X.svg";

function Tag({ text, hasDeleteBtn, onDelete }) {
  return (
    <div className="Tag">
      <p
        className={`Tag__text${hasDeleteBtn ? "--hasDeleteBtn" : ""}`}
      >{`#${text}`}</p>
      {hasDeleteBtn && <img src={XBtn} onClick={onDelete} />}
    </div>
  );
}

export default Tag;
