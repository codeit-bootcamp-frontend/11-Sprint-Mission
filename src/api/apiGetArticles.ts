import { ArticleParams, ArticleResponse } from "@/types/article";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const baseUrl =
  process.env.NEXT_PUBLIC_API_URL || "https://panda-market-api.vercel.app";

class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public originalError?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const createQueryParams = (params: ArticleParams): URLSearchParams => {
  const { page = 1, pageSize = 10, orderBy = "like", keyword = "" } = params;

  return new URLSearchParams({
    page: page.toString(),
    pageSize: pageSize.toString(),
    orderBy,
    ...(keyword && { keyword }),
  });
};

const apiGetArticles = async (
  params: ArticleParams
): Promise<ArticleResponse> => {
  try {
    const queryParams = createQueryParams(params);
    const response = await axios.get<ArticleResponse>(
      `${baseUrl}/articles?${queryParams}`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new ApiError(
        error.response?.data?.message || "Failed to fetch articles",
        error.response?.status,
        error
      );
    }
    throw new ApiError("An unexpected error occurred", undefined, error);
  }
};

// React Query hook
export const useArticles = (params: ArticleParams) => {
  return useQuery({
    queryKey: ["articles", params],
    queryFn: () => apiGetArticles(params),
  });
};

export type { ArticleParams, ArticleResponse };
