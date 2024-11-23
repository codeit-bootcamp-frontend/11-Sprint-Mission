import { getArticleList, GetArticleListParams } from "@/lib/article.api";
import { Article, ArticleList } from "@/types/Article.type";
import { useEffect, useState } from "react";
import styles from "./BestPostBoard.module.css";
import Image from "next/image";

const DEFAULT_ARTICLE_LIST: ArticleList = {
  totalCount: 0,
  list: [],
};

const DEFAULT_PARAMS: GetArticleListParams = {
  pageSize: 3,
  orderBy: "like",
};

export default function BestPostBoard() {
  const [articles, setArticles] = useState(DEFAULT_ARTICLE_LIST);
  const [params, setParams] = useState(DEFAULT_PARAMS);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticleList(params);
      setArticles(data);
    };
    fetchArticles();
  }, [params]);

  return (
    <div className={styles.Board}>
      <header className={styles.BoardHeader}>
        <h2 className={styles.BoardTitle}>베스트 게시글</h2>
      </header>
      <div className={styles.BoardItemList}>
        {articles.list.map((article) => (
          <PostItem key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
}

function PostItem({ article }: { article: Article }) {
  return (
    <div>
      <div>
        <div>
          <div style={{ width: "16px", height: "16px", position: "relative" }}>
            <Image fill src="/images/ic_medal.svg" alt="베스트" />
          </div>
          <span>Best</span>
        </div>
      </div>
      <div>
        <h3>{article.title}</h3>
        <div style={{ width: "72px", height: "62px", position: "relative" }}>
          <Image fill src={article.image} alt={article.title} />
        </div>
      </div>
      <div>
        <span>{article.writer.nickname}</span>
        <div>
          <div style={{ width: "16px", height: "16px", position: "relative" }}>
            <Image fill src="/images/ic_heart.svg" alt="베스트" />
          </div>
          <span>{article.likeCount < 10000 ? article.likeCount : "9999+"}</span>
        </div>
        <span>{article.createdAt}</span>
      </div>
    </div>
  );
}
