import React from "react";
import { Articles } from "../../util/types";
import styles from "./BestArticleCard.module.css";
import { formatDate } from "../../util/formatDates";
import { Link } from "react-router-dom";

interface BestArticleCardProps {
  articles: Articles;
}

const BestArticleCard = ({ articles }: BestArticleCardProps) => {
  return (
    <Link to={`/board/${articles.id}`} className={styles.link}>
      <div className={styles["article-box"]}>
        <div className={styles["best-sticker"]}>
          <div className={styles["best-img"]}>
            <img
              className={styles["image-component"]}
              src="/images/bestIcon.svg"
              alt="베스트 아이콘 이미지"
            />
          </div>
          <p className={styles["best-title"]}>Best</p>
        </div>
        <div className={styles["title-box"]}>
          <p className={styles["article-title"]}>{articles.title}</p>
          <div className={styles["product-img"]}>
            <img
              className={styles["image-component"]}
              src={articles.image}
              alt="상품 이미지"
            />
          </div>
        </div>
        <div className={styles["info-container"]}>
          <div className={styles["info-box"]}>
            <p className={styles.nickname}>{articles.writer.nickname}</p>
            <div className={styles["info-img"]}>
              <img
                className={styles["image-component"]}
                src="/images/heartIcon.svg"
                alt="좋아요 하트 이미지"
              />
            </div>
            <p className={styles["like-count"]}>{articles.likeCount}</p>
          </div>
          <p className={styles["create-date"]}>
            {formatDate(articles.createdAt)}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default BestArticleCard;
