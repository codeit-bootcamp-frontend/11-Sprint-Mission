import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";

interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  writer: {
    id: number;
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
  likeCount: number;
}

export default function Board() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsFetching(true);
        const res = await axiosInstance.get("/articles", {
          params: { page, limit: 10 },
        });
        const data = res.data.list;
        setArticles((prev) => [...prev, ...data]);
        setIsFetching(false);
      } catch (error) {
        console.error(
          "게시글 데이터를 가져오는 중 오류가 발생했습니다:",
          error
        );
        setIsFetching(false);
      }
    };

    fetchArticles();

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        !isFetching
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  return (
    <div>
      <h1>자유게시판</h1>
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
