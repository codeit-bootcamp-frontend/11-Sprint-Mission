import { ArticleParams, ArticleResponse } from "@/types/article";
import { useQuery } from "@tanstack/react-query";
import { fetchArticles } from "@/api/fetchArticles";  

export const useArticles = (params: ArticleParams) => 
  useQuery<ArticleResponse>({
    queryKey: ["articles", params],
    queryFn: () => fetchArticles(params),
  });

export type { ArticleParams, ArticleResponse }; 