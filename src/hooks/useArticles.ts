import { useEffect, useState } from "react";
import axios from "../util/axios";
import { Articles } from "../util/types";

export const useArticles = (orderBy: string, pageSize: number | null) => {
  const [bestArticles, setBestArticles] = useState<Articles[]>([]);
  const [articles, setArticles] = useState<Articles[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [more, setMore] = useState<boolean>(true);
  const [page, setPage] = useState<number>(1);

  // Best Articles 데이터 가져오기
  useEffect(() => {
    const getBestArticlesData = async () => {
      if (isFetching || !more) return;
      setIsFetching(true);
      try {
        const bestArticlesRes = await axios.get(
          `/articles?page=1&pageSize=${pageSize ?? 3}&orderBy=like`
        );
        setBestArticles(bestArticlesRes.data.list);
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다:", error);
      } finally {
        setIsFetching(false);
      }
    };
    getBestArticlesData();
  }, [pageSize]);

  // Articles 데이터 가져오기
  useEffect(() => {
    const getArticlesData = async () => {
      if (isFetching || !more) return;
      setIsFetching(true);
      try {
        const articlesRes = await axios.get(
          `/articles?page=${page}&pageSize=10&orderBy=${orderBy}`
        );

        const newArticles: Articles[] = articlesRes.data.list;
        const currentArticlesCount = articles.length + newArticles.length;

        if (
          newArticles.length === 0 ||
          currentArticlesCount > articlesRes.data.totalCount
        ) {
          setMore(false);
        } else if (page === 1) {
          const uniqueArticles = newArticles.filter(
            (newArticle) =>
              !articles.some((article) => article.id === newArticle.id)
          );
          setArticles((prev) => [...prev, ...uniqueArticles]);
        } else if (newArticles.length < 10) {
          setArticles((prev) => [...prev, ...newArticles]);
        } else {
          setArticles((prev) => [...prev, ...newArticles]);
        }
      } catch (error) {
        console.error("데이터를 불러오는데 실패했습니다:", error);
      } finally {
        setIsFetching(false);
      }
    };
    getArticlesData();
  }, [orderBy, page]);

  // 페이지 변경
  const onLoadMore = () => {
    if (more) {
      setPage((prev) => prev + 1);
    }
  };

  const resetData = () => {
    setArticles([]);
    setPage(1);
  };

  return { bestArticles, articles, onLoadMore, resetData };
};
