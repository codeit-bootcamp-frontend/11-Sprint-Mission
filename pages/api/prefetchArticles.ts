import axios from "@/lib/axios";
import { Articles } from "@/lib/types";

export const prefetchArticles = async () => {
  try {
    const bestArticlesRes = await axios.get(
      `/articles?page=1&pageSize=3&orderBy=like`
    );
    const articlesRes = await axios.get(
      `/articles?page=1&pageSize=10&orderBy=recent`
    );
    const initialBestArticles: Articles[] = bestArticlesRes.data.list ?? [];
    const initialArticles: Articles[] = articlesRes.data.list ?? [];
    return {
      props: {
        initialBestArticles,
        initialArticles,
      },
    };
  } catch (error) {
    console.error("데이터를 불러오는데 실패했습니다:", error);
    return {
      props: {
        initialBestArticles: [],
        initialArticles: [],
      },
    };
  }
};
