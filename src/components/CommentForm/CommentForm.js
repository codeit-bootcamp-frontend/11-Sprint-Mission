import ic_kebab from "../../assets/images/ic_kebab.svg";
import styles from "./CommentForm.module.css";

function CommentForm({ className }) {
  return (
    <div className={className}>
      <form className={styles["comment-input"]}>
        <label htmlFor="input-comment">문의하기</label>
        <textarea
          name="comment"
          id="input-comment"
          placeholder="개인정보를 공유 및 요청하거나, 명예훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 계시자에게 있습니다."
        />
        <button type="submit">등록</button>
      </form>
    </div>
  );
}

export default CommentForm;
