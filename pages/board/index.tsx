import React, { useEffect, useState } from "react";
import BestArticle from "@/components/board/BestArticle";
import AllArticle from "@/components/board/AllArticle";
import { Article, ArticleList } from "@/types/Types";

// export async function getStaticProps() {
//   const response = await fetch(
//     `https://panda-market-api.vercel.app/articles?orderBy=recent`
//   );
//   const data: ArticleList = await response.json();

//   return {
//     props: {
//       initialArticles: data.list,
//     },
//   };
// }

// interface BoardsPageProps {
//   initialArticles: Article[];
// }

// export default function BoardsPage({ initialArticles }: BoardsPageProps) {
//   return (
//     <div className="pageContainer">
//       <BestArticle />
//       <AllArticle initialArticles={initialArticles} />
//     </div>
//   );
// }

export default function BoardsPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true); // 로딩 시작
      try {
        const response = await fetch(
          `https://panda-market-api.vercel.app/articles?orderBy=recent`
        );
        const data = await response.json();
        setArticles(data.list);
      } catch (error) {
        console.error("오류: ", error);
      } finally {
        setLoading(false); // 로딩 종료
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pageContainer">
      <BestArticle />
      <AllArticle initialArticles={articles} />
    </div>
  );
}
