import { ArticleList } from "@/types/Article";
import axios from "./axios";

interface GetArticleListParams {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
  keyword?: string | undefined;
}

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

export { getArticleList };
