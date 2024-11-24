import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getArticleById } from "@/lib/api";
import { Article } from "@/types/commontypes";

export default function ArticlePage() {
  const router = useRouter();
  const { articleId } = router.query;
  const [article, setArticle] = useState<Article | null>(null);

  useEffect(() => {
    if (!articleId) return;

    const fetchArticle = async () => {
      try {
        const data = await getArticleById(articleId as string);
        setArticle(data);
      } catch (error) {
        console.error("게시물 데이터를 가져오는 중 오류 발생:", error);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (!article) return <p>로딩 중...</p>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      <p>작성자: {article.writer.nickname}</p>
      <p>작성일: {new Date(article.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
