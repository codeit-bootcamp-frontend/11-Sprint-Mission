import React from "react";
import styles from "./BestBoardList.module.css";

import { Articles } from "@/lib/types";
import BestArticleCard from "./BestArticleCard";

interface BestBoardListProps {
  bestArticles: Articles[];
}

const BestBoardList = ({ bestArticles }: BestBoardListProps) => {
  return (
    <div className={styles["best-container"]}>
      <p className={styles.title}>베스트 게시글</p>
      <div className={styles["best-box"]}>
        {bestArticles.map((articles) => (
          <BestArticleCard key={articles.id} articles={articles} />
        ))}
      </div>
    </div>
  );
};

export default BestBoardList;
