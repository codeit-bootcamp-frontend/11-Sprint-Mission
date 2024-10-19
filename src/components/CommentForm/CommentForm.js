import { useEffect, useState } from "react";
import ic_kebab from "../../assets/images/ic_kebab.svg";
import ic_profile from "../../assets/images/profile.svg";
import styles from "./CommentForm.module.css";
import useDebounce from "../../hooks/useDebounce";
import { getCommentById } from "../../api";

function CommentForm({ productId, className }) {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState();

  const handleInputChange = useDebounce((e) => {
    const next = e.target.value.trim();
    setComment(next);
  }, 500);

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
      <ul className={styles["Comment-list"]}>
        {comments
          ? comments.list.map((data) => (
              <li key={data.id}>
                <Comment data={data} />
              </li>
            ))
          : null}
      </ul>
    </div>
  );
}

function Comment({ data }) {
  return (
    <div className={styles["Comment"]}>
      <div className={styles["content"]}>
        {data.content}
        <img src={ic_kebab} alt="케밥" />
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

export default CommentForm;
