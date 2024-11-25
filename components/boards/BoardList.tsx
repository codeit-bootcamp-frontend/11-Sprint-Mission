import { FormatDate } from "@/lib/formatDate";
import React from "react";
import styles from "./BoardList.module.css";

interface BoardListProps {
  articles: Array<any>;
}

const BoardList = ({ articles }: BoardListProps) => {
  return (
    <div className={styles["board-list-container"]}>
      <div className={styles["title-box"]}>
        <p className={styles.title}>게시글</p>
        <button className={styles["write-button"]}>글쓰기</button>
      </div>
      <div className={styles["search-box"]}>
        <input
          className={styles["search-bar"]}
          placeholder="검색할 상품을 입력해주세요"
        />
        <div className={styles.customSelectWrapper}>
          <select className={styles["order-by-select"]}>
            <option className={styles.option}>최신순</option>
            <option className={styles.option}>좋아요순</option>
          </select>
          <img
            className={styles["sort-icon"]}
            src="/images/sortIcon.png"
            alt="화살표"
          />
        </div>
      </div>
      <div className={styles["article-container"]}>
        {articles.map((article) => (
          <div key={article.id} className={styles["article-box"]}>
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
                <img
                  className={styles["user-profile"]}
                  src="/images/profileBig.png"
                  alt="프로필 이미지"
                />
                <p className={styles["user-nickname"]}>
                  {article.writer.nickname}
                </p>
                <p className={styles.date}>{FormatDate(article.createdAt)}</p>
              </div>
              <div className={styles["like-count-box"]}>
                <img
                  className={styles.heart}
                  src="/images/heartIcon.png"
                  alt="좋아요 하트 이미지"
                />
                <p className={styles["like-count"]}>{article.likeCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardList;
