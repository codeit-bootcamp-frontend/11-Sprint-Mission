import OptionForm from "./OptionForm";
import Character from "../assets/images/character.svg";
import "./Comment.css";

function Comment() {
  return (
    <div className="comment">
      <div className="comment-head">
        <p className="question" />
        <OptionForm />
      </div>
      <div className="comment-bottom">
        <img src={Character} alt="캐릭터" />
        <div className="buyer-info">
          <p className="buyer-id" />
          <p className="comment-updatedAt" />
        </div>
      </div>
    </div>
  );
}

export default Comment;
