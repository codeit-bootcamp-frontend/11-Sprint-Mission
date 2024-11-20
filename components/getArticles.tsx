import axiosInstance from "@/lib/axiosInstance";
import { useEffect, useState } from "react";
import { Article } from "@/types/commontypes";

interface GetArticleProps {
  onDataFetch: (data: Article[]) => void;
}

export default function GetArticle({ onDataFetch }: GetArticleProps) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsFetching(true);

        const pageSize = window.innerWidth < 768 ? 2 : 3;

        const res = await axiosInstance.get("/articles", {
          params: { page, limit: pageSize },
        });
        const data = res.data.list;

        setArticles((prev) => [...prev, ...data]);
        onDataFetch([...articles, ...data]);
        setIsFetching(false);
      } catch (error) {
        console.error(
          "게시글 데이터를 가져오는 중 오류가 발생했습니다:",
          error
        );
        setIsFetching(false);
      }
    };

    fetchArticles();

    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 50 &&
        !isFetching
      ) {
        setPage((prev) => prev + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page]);

  return null;
}
