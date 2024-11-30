import { getArticle } from "@/api/article.api";
import { Article } from "@/types/Article.type";

export async function getServerSideProps(context: any) {
  const { id } = context.params;

  const article = await getArticle({ id });

  return {
    props: {
      article,
    },
  };
}

export default function ArticleDetail({ article }: { article: Article }) {
  if (!article) return null;

  return (
    <div>
      <h2>{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
}
