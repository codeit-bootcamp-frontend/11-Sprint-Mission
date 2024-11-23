import { getArticleList } from "@/lib/article.api";
import { ArticleList } from "@/types/Article";
import { useEffect, useState } from "react";
import PostBoard from "@/components/PostBoard";

const mock_article: ArticleList = { totalCount: 0, list: [] };

export default function Board() {
  const [articles, setArticles] = useState(mock_article);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticleList();
      setArticles(data);
    };
    fetchArticles();
  }, []);

  return (
    <>
      <BestPostBoard />
      <PostBoard articles={articles} />
    </>
  );
}

function BestPostBoard() {
  return null;
}
