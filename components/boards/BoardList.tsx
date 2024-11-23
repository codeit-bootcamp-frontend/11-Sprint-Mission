import { FormatDate } from "@/lib/formatDate";
import React from "react";
import styles from "./BoardList.module.css";

interface BoardListProps {
  articles: Array<any>;
}

const BoardList = ({ articles }: BoardListProps) => {
  return (
    <div className={styles.boardListContainer}>
      <div className={styles.titleBox}>
        <p className={styles.title}>게시글</p>
        <button className={styles.writeButton}>글쓰기</button>
      </div>
      <div className={styles.searchBox}>
        <input
          className={styles.searchBar}
          placeholder="검색할 상품을 입력해주세요"
        />
        <div className={styles.customSelectWrapper}>
          <select className={styles.orderBySelect}>
            <option className={styles.option}>최신순</option>
            <option className={styles.option}>좋아요순</option>
          </select>
          <img
            className={styles.sortIcon}
            src="/images/sortIcon.png"
            alt="화살표"
          />
        </div>
      </div>
      <div className={styles.articleContainer}>
        {articles.map((article) => (
          <div key={article.id} className={styles.articleBox}>
            <div className={styles.articleTitleBox}>
              <p className={styles.articleTitle}>{article.title}</p>
              <img
                className={styles.productImg}
                src={article.image}
                alt="물품 이미지"
              />
            </div>
            <div className={styles.infoBox}>
              <div className={styles.userInfoBox}>
                <img
                  className={styles.userProfile}
                  src="/images/profileBig.png"
                  alt="프로필 이미지"
                />
                <p className={styles.userNickname}>{article.writer.nickname}</p>
                <p className={styles.date}>{FormatDate(article.createdAt)}</p>
              </div>
              <div className={styles.likeCountBox}>
                <img
                  className={styles.heart}
                  src="/images/heartIcon.png"
                  alt="좋아요 하트 이미지"
                />
                <p className={styles.likeCount}>{article.likeCount}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardList;
