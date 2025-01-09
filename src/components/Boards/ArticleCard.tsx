import React from "react";
import { Articles } from "../../util/types";
import styles from "./ArticleCard.module.css";
import { formatDate } from "../../util/formatDates";
import { Link } from "react-router-dom";

interface ArticleCardProps {
  article: Articles;
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link to={`/board/${article.id}`} className={styles.link}>
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
              <img
                className={styles["image-component"]}
                src="/images/profileBig.svg"
                alt="프로필 이미지"
              />
            </div>
            <p className={styles["user-nickname"]}>{article.writer.nickname}</p>
            <p className={styles.date}>{formatDate(article.createdAt)}</p>
          </div>
          <div className={styles["like-count-box"]}>
            <div className={styles.heart}>
              <img
                className={styles["image-component"]}
                src="/images/heartIcon.svg"
                alt="좋아요 하트 이미지"
              />
            </div>
            <p className={styles["like-count"]}>{article.likeCount}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
