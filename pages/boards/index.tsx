import React from "react";
import BestArticle from "../../components/boards/BestArticle";
import AllArticle from "../../components/boards/AllArticle";
import { Article, ArticleList } from "@/types/Types";

export async function getServerSideProps() {
  const response = await fetch(
    `https://panda-market-api.vercel.app/articles?orderBy=recent`
  );
  const data: ArticleList = await response.json();

  return {
    props: {
      initialArticles: data.list,
    },
  };
}

interface BoardsPageProps {
  initialArticles: Article[];
}

export default function BoardsPage({ initialArticles }: BoardsPageProps) {
  return (
    <div className="pageContainer">
      <BestArticle />
      <AllArticle initialArticles={initialArticles} />
    </div>
  );
}
