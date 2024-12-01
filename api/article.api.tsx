import { Article, ArticleList } from "@/types/Article.type";
import axios from "./axios";

interface GetArticleListParams {
  page?: number;
  pageSize?: number;
  orderBy?: OrderBy;
  keyword?: string | undefined;
}

type OrderBy = "recent" | "like";

async function getArticleList({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword,
}: GetArticleListParams = {}): Promise<ArticleList> {
  const response = await axios.get("/articles", {
    params: {
      page,
      pageSize,
      orderBy,
      keyword,
    },
  });
  return response.data;
}

async function getArticle({ id }: { id: number }): Promise<Article> {
  const response = await axios.get(`/articles/${id}`);
  return response.data;
}

interface PostArticle {
  image?: string;
  content: string;
  title: string;
}

async function postArticle({ image, content, title }: PostArticle) {
  const response = await axios.post("/articles", {
    body: {
      content,
      title,
      image,
    },
  });
  return response.data;
}

export { getArticleList, getArticle, postArticle };
export type { GetArticleListParams, OrderBy };
