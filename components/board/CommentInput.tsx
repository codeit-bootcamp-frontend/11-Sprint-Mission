import React from "react";
import styles from "./CommentInput.module.css";

const CommentInput = () => {
  return (
    <section className={styles.container}>
      <p className={styles.title}>댓글달기</p>
      <div className={styles.box}>
        <textarea
          className={styles.input}
          placeholder="댓글을 입력해주세요."
        ></textarea>
        <button className={styles.button}>등록</button>
      </div>
    </section>
  );
};

export default CommentInput;
