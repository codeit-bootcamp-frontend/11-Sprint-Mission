import { useState } from "react";
import GetArticle from "@/components/getArticles";
import { Article } from "@/types/commontypes";
import Image from "next/image";
import styles from "@/styles/board.module.css";
import defaultImage from "@/public/pngs/noImage.png";

export default function Board() {
  const [articles, setArticles] = useState<Article[]>([]);

  const getBestArticles = (articles: Article[]) => {
    return [...articles].sort((a, b) => b.likeCount - a.likeCount).slice(0, 3);
  };

  const handleDataFetch = (data: Article[]) => {
    setArticles((prev) => {
      const mergedArticles = [...prev, ...data];
      const uniqueArticles = mergedArticles.filter(
        (article, index, self) =>
          self.findIndex((a) => a.id === article.id) === index
      );
      return uniqueArticles;
    });
  };

  const bestArticles = getBestArticles(articles);

  return (
    <div className={styles.board_container}>
      <GetArticle onDataFetch={handleDataFetch} />
      <div className={styles.best_article_container}>
        <h1 className={styles.best_article_title}>베스트 게시글</h1>
        <article className={styles.best_article}>
          {bestArticles.map((article) => (
            <div key={article.id}>
              <div>🏆 Best</div>
              <div className={styles.best_article_middle}>
                <div className={styles.best_article_title}>{article.title}</div>
                <Image
                  className={styles.best_article_img}
                  src={article.image || defaultImage}
                  alt={article.title}
                  width={50}
                  height={50}
                />
              </div>
              <div className={styles.best_article_author}>
                {article.writer.nickname}
              </div>
              <div className={styles.best_article_date}>
                {new Date(article.createdAt).toLocaleDateString()}
              </div>
              <div className={styles.best_article_like}>
                {article.likeCount}
              </div>
            </div>
          ))}
        </article>
      </div>

      <div className={styles.article_container}>
        <h2>게시글</h2>
        <article className={styles.article}>
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.id}>
                <div className={styles.article_title}>{article.title}</div>
                <div className={styles.article_author}>
                  {article.writer.nickname}
                </div>
                <div className={styles.article_date}>
                  {new Date(article.createdAt).toLocaleDateString()}
                </div>
                <div className={styles.article_like}>{article.likeCount}</div>
                <Image
                  className={styles.article_img}
                  src={article.image || defaultImage}
                  alt={article.title}
                  width={50}
                  height={50}
                />
              </div>
            ))
          ) : (
            <p>게시글이 없습니다.</p>
          )}
        </article>
      </div>
    </div>
  );
}
