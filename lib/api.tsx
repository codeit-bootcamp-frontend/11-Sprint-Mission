import axiosInstance from "@/lib/axiosInstance";
import {
  GetArticlesResponse,
  GetArticlesParams,
  Article,
} from "@/types/commontypes";

export async function getArticles(
  params: GetArticlesParams = {}
): Promise<GetArticlesResponse> {
  try {
    const { orderBy = "recent", pageSize, page, keyword } = params;

    const { data } = await axiosInstance.get<GetArticlesResponse>("/articles", {
      params: { orderBy, pageSize, page, keyword },
    });

    return data;
  } catch (error) {
    throw new Error("게시물을 불러오는데 실패했습니다.");
  }
}

export async function getArticleById(id: number): Promise<Article> {
  const response = await axiosInstance.get(`/articles/${id}`);
  return response.data;
}
