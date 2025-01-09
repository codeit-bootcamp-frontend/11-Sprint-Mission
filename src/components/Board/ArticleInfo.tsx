import React from "react";
import styles from "./ArticleInfo.module.css";
import { formatDate } from "../../util/formatDates";
import dotIcon from "../../assets/images/dotIcon.svg";
import profileBig from "../../assets/images/profileBig.svg";
import heartIcon from "../../assets/images/heartIcon.svg";

interface Article {
  title: string;
  writer: {
    nickname: string;
  };
  createdAt: string;
  likeCount: number;
  content: string;
}

interface ArticleInfoProps {
  article: Article;
}

const ArticleInfo = ({ article }: ArticleInfoProps) => {
  return (
    <section className={styles.container}>
      <div className={styles.box}>
        <p className={styles.article}>{article.title}</p>
        <div className={styles.dot}>
          <img
            className={styles.image}
            src={dotIcon}
            alt="추가 메뉴 클릭 이미지"
          />
        </div>
      </div>
      <div className={styles["info-box"]}>
        <div className={styles.profile}>
          <div className={styles["profile-image"]}>
            <img
              className={styles.image}
              src={profileBig}
              alt="프로필 빅 이미지"
            />
          </div>
          <p className={styles.nickname}>{article.writer.nickname}</p>
          <p className={styles.date}>{formatDate(article.createdAt)}</p>
        </div>
        <div className={styles.like}>
          <div className={styles.heart}>
            <img
              className={styles.image}
              src={heartIcon}
              alt="좋아요 하트 이미지"
            />
          </div>
          <p className={styles.count}>{article.likeCount}</p>
        </div>
      </div>
      <p className={styles.content}>{article.content}</p>
    </section>
  );
};

export default ArticleInfo;
