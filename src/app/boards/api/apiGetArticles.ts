import { ArticleParams, ArticleResponse } from "@/types/article";
import axios from "axios";

const BASE_URL = "https://panda-market-api.vercel.app";

const apiGetArticles = async ({
  page = 1,
  pageSize = 10,
  orderBy = "like",
  keyword = "",
}: ArticleParams) => {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
      orderBy,
      ...(keyword && { keyword }) /* 검색어가 있으면 쿼리에 추가 */,
    });

    const response = await axios.get<ArticleResponse>(
      `${BASE_URL}/articles?${queryParams}`
    );
    return response.data;
  } catch (error) {
    console.error("articles 가져오기 실패:", error);
    throw error;
  }
};

export default apiGetArticles;
