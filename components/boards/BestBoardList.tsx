import React from "react";
import styles from "./BestBoardList.module.css";
import { FormatDate } from "@/lib/formatDate";
import Image from "next/image";
import { Articles } from "@/lib/types";

interface BestBoardListProps {
  bestArticles: Articles[];
}

const BestBoardList = ({ bestArticles }: BestBoardListProps) => {
  return (
    <div className={styles["best-container"]}>
      <p className={styles.title}>베스트 게시글</p>
      <div className={styles["best-box"]}>
        {bestArticles.map((articles) => (
          <div key={articles.id} className={styles["article-box"]}>
            <div className={styles["best-sticker"]}>
              <div className={styles["best-img"]}>
                <Image
                  className={styles["image-component"]}
                  fill
                  src="/images/bestIcon.svg"
                  alt="베스트 아이콘 이미지"
                />
              </div>
              <p className={styles["best-title"]}>Best</p>
            </div>
            <div className={styles["title-box"]}>
              <p className={styles["article-title"]}>{articles.title}</p>
              <div className={styles["product-img"]}>
                <Image
                  className={styles["image-component"]}
                  fill
                  src={articles.image}
                  alt="상품 이미지"
                />
              </div>
            </div>
            <div className={styles["info-container"]}>
              <div className={styles["info-box"]}>
                <p className={styles.nickname}>{articles.writer.nickname}</p>
                <div className={styles["info-img"]}>
                  <Image
                    className={styles["image-component"]}
                    fill
                    src="/images/heartIcon.svg"
                    alt="좋아요 하트 이미지"
                  />
                </div>
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
