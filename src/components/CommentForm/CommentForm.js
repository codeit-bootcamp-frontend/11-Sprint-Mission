import { useEffect, useState } from "react";
import ic_kebab from "../../assets/images/ic_kebab.svg";
import ic_profile from "../../assets/images/profile.svg";
import styles from "./CommentForm.module.css";
import useDebounce from "../../hooks/useDebounce";
import { getCommentById } from "../../api";
import no_comment from "../../assets/images/no_comment.svg";

function CommentForm({ productId, className }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState();
  const [selectedComment, setSelectedComment] = useState(null);
  const [isEditing, setIsEditing] = useState(null);

  const handleInputChange = useDebounce((e) => {
    const next = e.target.value.trim();
    setComment(next);
  }, 500);

  const handleOptionClick = (e) => {
    if (e.target.dataset.option === "edit") {
      setIsEditing(e.currentTarget.dataset.id);
      setSelectedComment(null);
      return;
    }

    if (selectedComment) {
      setSelectedComment(null);
      return;
    }

    if (e.target.classList.contains("feature")) {
      setSelectedComment(e.currentTarget.dataset.id);
      return;
    }
    setSelectedComment(null);
  };

  const handleSelectOption = (e) => {
    if (e.target.dataset.option === "edit") {
      setIsEditing(e.currentTarget.dataset.id);
      setSelectedComment(null);
      return;
    }

    if (e.target.dataset.option === "delete") {
      alert(`test : comment id ${e.currentTarget.dataset.id} 삭제 되었습니다`);
    }
  };

  const handleEditCancel = () => {
    setIsEditing(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getCommentById("products", productId, 10);
      setComments(result);
    };
    fetchData();
  }, [productId]);

  return (
    <div className={className}>
      <form className={styles["comment-input-form"]}>
        <label htmlFor="input-comment">문의하기</label>
        <textarea
          name="comment"
          id="input-comment"
          onChange={handleInputChange}
          placeholder="개인정보를 공유 및 요청하거나, 명예훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 계시자에게 있습니다."
        />
        <button disabled={comment ? false : true} type="submit">
          등록
        </button>
      </form>

      {comments?.list.length ? (
        <ul className={styles["Comment-list"]}>
          {comments.list.map((data) => (
            <li key={data.id}>
              {isEditing === String(data.id) ? (
                <CommentEditForm data={data} onCancel={handleEditCancel} />
              ) : (
                <CommentListItem
                  data={data}
                  isSelected={selectedComment === String(data.id)}
                  onClick={handleOptionClick}
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <img
          className={styles["no-comment"]}
          src={no_comment}
          alt="문의가 읎음"
        />
      )}
    </div>
  );
}

function CommentListItem({ data, isSelected, onClick }) {
  return (
    <div
      data-id={data.id}
      className={styles["CommentListItem"]}
      onClick={onClick}
    >
      <div className={styles["content"]}>
        {data.content}
        <img className="feature" src={ic_kebab} alt="케밥" />
        {isSelected && (
          <div className={styles["select"]}>
            <div className={styles["option"]} data-option="edit">
              수정하기
            </div>
            <div className={styles["option"]} data-option="delete">
              삭제하기
            </div>
          </div>
        )}
      </div>
      <div className={styles["writer"]}>
        <img
          className={styles["profile"]}
          src={data.writer.image || ic_profile}
          alt="판매자 프로필"
        />
        <div className={styles["main"]}>
          <div className={styles["name"]}>{data.writer.nickname}</div>
          <div className={styles["date"]}>2024.01.02</div>
        </div>
      </div>
    </div>
  );
}

function CommentEditForm({ data, onCancel }) {
  const [content, setContent] = useState(data.content);

  const handleInputChange = (e) => {
    const next = e.target.value.trim();
    setContent(next);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    alert(`test : Edit "${content}" from "${data.content.trim()}"`);
    onCancel();
  };

  return (
    <form
      data-id={data.id}
      className={styles["CommentEditForm"]}
      onSubmit={handleEditSubmit}
    >
      <textarea value={content} onChange={handleInputChange} />
      <div className={styles["writer"]}>
        <img
          className={styles["profile"]}
          src={data.writer.image || ic_profile}
          alt="판매자 프로필"
        />
        <div className={styles["main"]}>
          <div className={styles["name"]}>{data.writer.nickname}</div>
          <div className={styles["date"]}>2024.01.02</div>
        </div>
      </div>
      <button type="button" onClick={onCancel}>
        취소
      </button>
      <button type="submit">수정 완료</button>
    </form>
  );
}

export default CommentForm;
