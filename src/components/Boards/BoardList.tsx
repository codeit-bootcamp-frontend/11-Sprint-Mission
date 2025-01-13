import React, { useState } from "react";
import styles from "./BoardList.module.css";
import { Articles } from "../../util/types";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import BoardSearchSort from "./BoardSearchSort";

interface BoardListProps {
  articles: Articles[];
  onOrderChange: (newOrder: string) => void;
}

const BoardList = ({ articles, onOrderChange }: BoardListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={styles["board-list-container"]}>
      <div className={styles["title-box"]}>
        <p className={styles.title}>게시글</p>
        <Link to="/addboard">
          <button className={styles["write-button"]}>글쓰기</button>
        </Link>
      </div>
      <BoardSearchSort
        searchQuery={searchQuery}
        onSearchChange={handleSearch}
        onOrderChange={onOrderChange}
      />
      <div className={styles["article-container"]}>
        {filteredArticles.map((article, index) => (
          <ArticleCard key={`${index}_${article.id}`} article={article} />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
