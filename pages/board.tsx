import { useState } from "react";
import GetArticle from "@/components/getArticles";
import { Article } from "@/types/commontypes";
import Image from "next/image";

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
    <div className="board-container">
      <GetArticle onDataFetch={handleDataFetch} />
      <div>
        <h1>베스트 게시글</h1>
        <div>
          {bestArticles.map((article) => (
            <div key={article.id}>
              <h3>🏆 Best</h3>
              <h2>{article.title}</h2>
              <p>
                <strong>작성자:</strong> {article.writer.nickname}
              </p>
              <p>
                <strong>작성일:</strong>{" "}
                {new Date(article.createdAt).toLocaleDateString()}
              </p>
              <p>
                <strong>좋아요:</strong> {article.likeCount}
              </p>
              {article.image && (
                <Image
                  src={article.image}
                  alt={article.title}
                  width={50}
                  height={50}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3>게시글</h3>
        <div>
          {articles.length > 0 ? (
            articles.map((article) => (
              <div key={article.id}>
                <h2>{article.title}</h2>
                <p>
                  <strong>작성자:</strong> {article.writer.nickname}
                </p>
                <p>
                  <strong>작성일:</strong>{" "}
                  {new Date(article.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <strong>좋아요:</strong> {article.likeCount}
                </p>
                {article.image && (
                  <Image
                    src={article.image}
                    alt={article.title}
                    width={50}
                    height={50}
                  />
                )}
              </div>
            ))
          ) : (
            <p>게시글이 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
