import React from "react";
import styles from "./AddBoard.module.css";

const AddBoard = () => {
  return (
    <div className={styles.container}>
      <section className={styles.header}>
        <p className={styles.topic}>게시글 쓰기</p>
        <button className={styles.button}>등록</button>
      </section>
      <section className={styles.body}>
        <div>
          <p className={styles.title}>*제목</p>
          <input
            className={`${styles.input} ${styles.name}`}
            placeholder="제목을 입력해주세요"
          ></input>
        </div>
        <div>
          <p className={styles.title}>*내용</p>
          <textarea
            className={`${styles.input} ${styles.content}`}
            placeholder="내용을 입력해주세요"
          ></textarea>
        </div>
        <div>
          <p className={styles.title}>이미지</p>
          <div className={styles.box}>
            <label htmlFor="image-upload" className={styles.label}>
              <p className={styles.plus}>+</p>
              <p className={styles.upload}>이미지등록</p>
            </label>
          </div>
          <input
            type="file"
            id="image-upload"
            name="images"
            className={styles.none}
          />
        </div>
      </section>
    </div>
  );
};

export default AddBoard;
