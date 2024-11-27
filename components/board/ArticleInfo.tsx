import React from "react";
import styles from "./ArticleInfo.module.css";
import Image from "next/image";
import { formatDate } from "@/lib/formatDate";

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
          <Image
            className={styles.image}
            fill
            src="/images/dotIcon.svg"
            alt="추가 메뉴 클릭 이미지"
          />
        </div>
      </div>
      <div className={styles["info-box"]}>
        <div className={styles.profile}>
          <div className={styles["profile-image"]}>
            <Image
              className={styles.image}
              fill
              src="/images/profileBig.svg"
              alt="프로필 이미지"
            />
          </div>
          <p className={styles.nickname}>{article.writer.nickname}</p>
          <p className={styles.date}>{formatDate(article.createdAt)}</p>
        </div>
        <div className={styles.like}>
          <div className={styles.heart}>
            <Image
              className={styles.image}
              fill
              src="/images/heartIcon.svg"
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
