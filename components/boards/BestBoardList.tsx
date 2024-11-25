import React from "react";
import styles from "./BestBoardList.module.css";
import { FormatDate } from "@/lib/formatDate";

interface BestBoardListProps {
  bestArticles: Array<any>;
}

const BestBoardList = ({ bestArticles }: BestBoardListProps) => {
  return (
    <div className={styles["best-container"]}>
      <p className={styles.title}>베스트 게시글</p>
      <div className={styles["best-box"]}>
        {bestArticles.map((articles) => (
          <div key={articles.id} className={styles["article-box"]}>
            <div className={styles["best-sticker"]}>
              <img
                className={styles["best-img"]}
                src="/images/bestIcon.png"
                alt="베스트 아이콘 이미지"
              />
              <p className={styles["best-title"]}>Best</p>
            </div>
            <div className={styles["title-box"]}>
              <p className={styles["article-title"]}>{articles.title}</p>
              <img
                className={styles["product-img"]}
                src={articles.image}
                alt="상품 이미지"
              />
            </div>
            <div className={styles["info-container"]}>
              <div className={styles["info-box"]}>
                <p className={styles.nickname}>{articles.writer.nickname}</p>
                <img
                  className={styles["info-img"]}
                  src="/images/heartIcon.png"
                  alt="좋아요 하트 이미지"
                />
                <p className={styles["like-count"]}>{articles.likeCount}</p>
              </div>
              <p className={styles["create-date"]}>
                {FormatDate(articles.createdAt)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestBoardList;
