import axiosInstance from "@/lib/axiosInstance";
import { GetArticlesResponse, GetArticlesParams } from "@/types/commontypes";

export async function getArticles(
  params: GetArticlesParams = {}
): Promise<GetArticlesResponse> {
  try {
    const { orderBy = "recent", pageSize, page } = params;

    const { data } = await axiosInstance.get<GetArticlesResponse>("/articles", {
      params: { orderBy, pageSize, page },
    });

    return data;
  } catch (error) {
    throw new Error("게시물을 불러오는데 실패했습니다.");
  }
}
