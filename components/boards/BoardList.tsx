import { formatDate } from "@/lib/formatDate";
import React, { useEffect, useState } from "react";
import styles from "./BoardList.module.css";
import { Articles } from "@/lib/types";
import Image from "next/image";

interface BoardListProps {
  articles: Articles[];
  onOrderChange: (newOrder: string) => void;
}

const BoardList = ({ articles, onOrderChange }: BoardListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          onChange={handelSearch}
          value={searchQuery}
        />
        <div className={styles["select-wrapper"]}>
          <select
            className={styles["order-by-select"]}
            onChange={(e) => onOrderChange(e.target.value)}
          >
            <option className={styles.option} value="recent">
              최신순
            </option>
            <option className={styles.option} value="like">
              좋아요순
            </option>
          </select>
          <div className={styles["sort-icon"]}>
            <Image
              className={styles["image-component"]}
              fill
              src="/images/sortIcon.svg"
              alt="화살표"
            />
          </div>
        </div>
      </div>
      <div className={styles["article-container"]}>
        {filteredArticles.map((article) => (
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
                <div className={styles["user-profile"]}>
                  <Image
                    className={styles["image-component"]}
                    fill
                    src="/images/profileBig.svg"
                    alt="프로필 이미지"
                  />
                </div>
                <p className={styles["user-nickname"]}>
                  {article.writer.nickname}
                </p>
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
        ))}
      </div>
    </div>
  );
};

export default BoardList;
