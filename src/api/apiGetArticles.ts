import { ArticleParams, ArticleResponse } from "@/types/article";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
if (!baseUrl) throw new Error("Missing NEXT_PUBLIC_API_URL");

const createQueryParams = ({
  page = 1,
  pageSize = 10,
  orderBy = "like",
  keyword = "",
}: ArticleParams) =>
  new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    orderBy,
    ...(keyword && { keyword }) /*Keyword가 있으면 쿼리에 추가*/,
  });

const apiGetArticles = async (
  params: ArticleParams
): Promise<ArticleResponse> => {
  try {
    const { data } = await axios.get<ArticleResponse>(
      `${baseUrl}/articles?${createQueryParams(params)}`
    );
    return data;
  } catch (error) {
    const message = axios.isAxiosError(error)
      ? error.response?.data?.message ??
        "error occurred & server error message is missing"
      : "An unexpected error occurred(not axios error)";
    throw new Error(message);
  }
};

export const useArticles = (params: ArticleParams) =>
  useQuery({
    queryKey: ["articles", params],
    queryFn: () => apiGetArticles(params),
  });

export type { ArticleParams, ArticleResponse };
