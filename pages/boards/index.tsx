import BestBoardList from "@/components/boards/BestBoardList";
import BoardList from "@/components/boards/BoardList";
import axios from "@/lib/axios";
import { Articles } from "@/lib/types";
import { setupResizeListener } from "@/lib/resize";
import { setupScrollListener } from "@/lib/scroll";
import { prefetchArticles } from "../api/prefetchArticles";
import React, { useEffect, useState, useRef } from "react";
import styles from "@/pages/boards/index.module.css";
import { useArticles } from "@/hooks/useArticles";

export const getServerSideProps = prefetchArticles;
interface ArticleProps {
  initialBestArticles: Articles[];
  initialArticles: Articles[];
}

const Article = ({ initialBestArticles, initialArticles }: ArticleProps) => {
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [pageSize, setPageSize] = useState<number | null>(null);
  const scrollBoxRef = useRef<HTMLDivElement>(null);

  const { bestArticles, articles, onLoadMore, resetData } = useArticles(
    initialBestArticles,
    initialArticles,
    orderBy,
    pageSize
  );

  const handleOrderChange = (newOrder: string) => {
    setOrderBy(newOrder);
    resetData();
  };

  useEffect(() => {
    const cleanResizeListener = setupResizeListener(setPageSize);
    return () => {
      cleanResizeListener();
    };
  }, []);

  useEffect(() => {
    const cleanScrollListener = setupScrollListener(scrollBoxRef, onLoadMore);
    return () => {
      cleanScrollListener();
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
