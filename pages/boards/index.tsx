import BestBoardList from "@/components/boards/BestBoardList";
import BoardList from "@/components/boards/BoardList";
import axios from "@/lib/axios";
import { Articles } from "@/lib/types";
import React, { useEffect, useState, useRef } from "react";
import styles from "@/pages/boards/index.module.css";

export const getServerSideProps = async () => {
  try {
    const bestArticlesRes = await axios.get(
      `/articles?page=1&pageSize=3&orderBy=like`
    );
    const articlesRes = await axios.get(
      `/articles?page=1&pageSize=10&orderBy=recent`
    );
    const initialBestArticles = bestArticlesRes.data.list ?? [];
    const initialArticles = articlesRes.data.list ?? [];
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

interface ArticleProps {
  initialBestArticles: Articles[];
  initialArticles: Articles[];
}

const Article = ({ initialBestArticles, initialArticles }: ArticleProps) => {
  let initialOrderBy = "recent";
  const [bestArticles, setBestArticles] = useState(initialBestArticles);
  const [articles, setArticles] = useState(initialArticles);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [pageSize, setPageSize] = useState<number | null>(null);
  const [page, setPage] = useState(1);
  const [more, setMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);

  function getPageSize(width: number): number {
    // 윈도우 크기에 따라 pageSize 계산하는 함수
    if (width > 744) {
      return 3;
    } else if (width > 376) {
      return 2;
    } else {
      return 1;
    }
  }

  useEffect(() => {
    // 윈도우 크기 변경 시 pageSize를 업데이트
    const handleResize = () => {
      setPageSize(getPageSize(window.innerWidth));
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    async function getBestArticlesData() {
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
    }
    getBestArticlesData();
  }, [pageSize]);

  useEffect(() => {
    async function getArticlesData() {
      if (isFetching || !more) return;
      setIsFetching(true);
      try {
        const articlesRes = await axios.get(
          `/articles?page=${page}&pageSize=10&orderBy=${orderBy}`
        );

        const newArticles = articlesRes.data.list;
        const currentArticlesCount = articles.length + newArticles.length;

        if (
          newArticles.length === 0 ||
          currentArticlesCount > articlesRes.data.totalCount
        ) {
          setMore(false);
        } else if (page === 1) {
          const uniqueArticles = newArticles.filter(
            (newArticle: any) =>
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
    }
    getArticlesData();
  }, [orderBy, page]);

  const handleOrderChange = (newOrder: string) => {
    setOrderBy(newOrder);
    setArticles([]);
    setPage(1);
  };

  const scrollBoxRef = useRef<HTMLDivElement>(null);

  const onLoadMore = () => {
    if (more) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    if (!scrollBoxRef.current) {
      console.error("scrollBoxRef가 연결되지 않았습니다.");
      return;
    }

    const handleScroll = () => {
      if (scrollBoxRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = scrollBoxRef.current;

        if (scrollTop + clientHeight >= scrollHeight - 1) {
          onLoadMore(); // 끝에 도달하면 데이터 로드
        }
      }
    };

    const scrollBoxElement = scrollBoxRef.current;
    if (scrollBoxElement) {
      scrollBoxElement.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (scrollBoxElement) {
        scrollBoxElement.removeEventListener("scroll", handleScroll);
      }
    };
  }, [onLoadMore]);

  return (
    <div className={styles.container} ref={scrollBoxRef}>
      <BestBoardList bestArticles={bestArticles} />
      <BoardList articles={articles} onOrderChange={handleOrderChange} />
    </div>
  );
};

export default Article;
