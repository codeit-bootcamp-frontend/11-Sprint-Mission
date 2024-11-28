import React from "react";
import styles from "./ArticleCommentInfo.module.css";
import Image from "next/image";

interface ArticleComment {
  id: number;
  content: string;
  writer: {
    nickname: string;
  };
  createdAt: string;
}

interface ArticleCommentInfoProps {
  articleComments: ArticleComment[];
}

const ArticleCommentInfo = ({ articleComments }: ArticleCommentInfoProps) => {
  if (!articleComments || articleComments.length === 0) {
    return (
      <section className={styles["no-container"]}>
        <div className={styles["no-comments"]}>
          <div className={styles["no-comments-box"]}>
            <Image
              className={styles.image}
              fill
              src="/images/noArticleComments.svg"
              alt="추가 메뉴 클릭 이미지"
            />
          </div>
          <div className={styles["no-text-box"]}>
            <p className={styles["no-text"]}>아직 댓글이 없어요.</p>
            <p className={styles["no-text"]}>지금 댓글을 달아보세요!</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section className={styles.container}>
      {articleComments.map((comment) => (
        <div key={comment.id} className={styles.box}>
          <div className={styles["content-box"]}>
            <p className={styles.title}>{comment.content}</p>
            <div className={styles.dot}>
              <Image
                className={styles.image}
                fill
                src="/images/dotIcon.svg"
                alt="추가 메뉴 클릭 이미지"
              />
            </div>
          </div>
          <div className={styles["user-box"]}>
            <div className={styles.profile}>
              <Image
                className={styles.image}
                fill
                src="/images/profileBig.svg"
                alt="추가 메뉴 클릭 이미지"
              />
            </div>
            <div className={styles.info}>
              <p className={styles.nickname}>{comment.writer.nickname}</p>
              <p className={styles.date}>{comment.createdAt}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ArticleCommentInfo;
