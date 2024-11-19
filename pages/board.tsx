import { useState } from "react";
import GetArticle from "@/components/getArticles";
import { Article } from "@/types/commontypes";

export default function Board() {
  const [articles, setArticles] = useState<Article[]>([]);

  const handleDataFetch = (data: Article[]) => {
    setArticles(data);
  };

  return (
    <div>
      <h1>자유게시판</h1>
      <GetArticle onDataFetch={handleDataFetch} />
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
                <img
                  src={article.image}
                  alt={article.title}
                  style={{
                    width: "100px",
                    height: "100px",
                    objectFit: "cover",
                  }}
                />
              )}
            </div>
          ))
        ) : (
          <p>게시글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
