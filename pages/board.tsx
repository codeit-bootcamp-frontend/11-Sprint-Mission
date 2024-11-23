import BestPostBoard from "@/components/BestPostBoard";
import PostBoard from "@/components/PostBoard";
import { getArticleList } from "@/api/article.api";
import { ArticleList } from "@/types/Article.type";
import styles from "../styles/borad.module.css";

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
    <div className={styles.container}>
      <BestPostBoard articles={bestArticles} />
      <PostBoard articles={allArticles} />
    </div>
  );
}
