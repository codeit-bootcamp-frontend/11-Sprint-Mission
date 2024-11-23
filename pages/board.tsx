import BestPostBoard from "@/components/BestPostBoard";
import PostBoard from "@/components/PostBoard";
import { getArticleList } from "@/lib/article.api";
import { ArticleList } from "@/types/Article.type";

export async function getServerSideProps() {
  const allArticles = await getArticleList({
    page: 1,
    pageSize: 10,
    orderBy: "recent",
  });

  const bestArticles = await getArticleList({
    pageSize: 3,
    orderBy: "like",
  });

  return {
    props: {
      allArticles,
      bestArticles,
    },
  };
}

export default function Board({
  allArticles,
  bestArticles,
}: {
  allArticles: ArticleList;
  bestArticles: ArticleList;
}) {
  return (
    <>
      <BestPostBoard articles={bestArticles} />
      <PostBoard articles={allArticles} />
    </>
  );
}
