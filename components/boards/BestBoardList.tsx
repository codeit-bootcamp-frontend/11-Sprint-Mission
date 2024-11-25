import React from "react";
import styles from "./BestBoardList.module.css";
import { FormatDate } from "@/lib/formatDate";

interface BestBoardListProps {
  bestArticles: Array<any>;
}

const BestBoardList = ({ bestArticles }: BestBoardListProps) => {
  return (
    <div className={styles.bestContainer}>
      <p className={styles.title}>베스트 게시글</p>
      <div className={styles.bestBox}>
        {bestArticles.map((articles) => (
          <div key={articles.id} className={styles.articleBox}>
            <div className={styles.bestSticker}>
              <img
                className={styles.bestImg}
                src="/images/bestIcon.png"
                alt="베스트 아이콘 이미지"
              />
              <p className={styles.bestTitle}>Best</p>
            </div>
            <div className={styles.titleBox}>
              <p className={styles.articleTitle}>{articles.title}</p>
              <img
                className={styles.productImg}
                src={articles.image}
                alt="상품 이미지"
              />
            </div>
            <div className={styles.infoContainer}>
              <div className={styles.infoBox}>
                <p className={styles.nickname}>{articles.writer.nickname}</p>
                <img
                  className={styles.infoImg}
                  src="/images/heartIcon.png"
                  alt="좋아요 하트 이미지"
                />
                <p className={styles.likeCount}>{articles.likeCount}</p>
              </div>
              <p className={styles.createDate}>
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
