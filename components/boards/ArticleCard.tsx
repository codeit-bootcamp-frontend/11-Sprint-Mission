import React from "react";
import { Articles } from "@/lib/types";
import styles from "@/components/boards/ArticleCard.module.css";
import { formatDate } from "@/lib/formatDate";
import Image from "next/image";

interface ArticleCardProps {
  article: Articles;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <div className={styles["article-box"]}>
      <div className={styles["article-title-box"]}>
        <p className={styles["article-title"]}>{article.title}</p>
        <img
          className={styles["product-img"]}
          src={article.image}
          alt="물품 이미지"
        />
      </div>
      <div className={styles["info-box"]}>
        <div className={styles["user-info-box"]}>
          <div className={styles["user-profile"]}>
            <Image
              className={styles["image-component"]}
              fill
              src="/images/profileBig.svg"
              alt="프로필 이미지"
            />
          </div>
          <p className={styles["user-nickname"]}>{article.writer.nickname}</p>
          <p className={styles.date}>{formatDate(article.createdAt)}</p>
        </div>
        <div className={styles["like-count-box"]}>
          <div className={styles.heart}>
            <Image
              className={styles["image-component"]}
              fill
              src="/images/heartIcon.svg"
              alt="좋아요 하트 이미지"
            />
          </div>
          <p className={styles["like-count"]}>{article.likeCount}</p>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
