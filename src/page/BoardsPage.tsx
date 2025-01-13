import BestBoardList from "../components/Boards/BestBoardList";
import BoardList from "../components/Boards/BoardList";
import { setupResizeListener } from "../util/resize";
import { setupScrollListener } from "../util/scroll";
import React, { useEffect, useState, useRef } from "react";
import styles from "./BoardsPage.module.css";
import { useArticles } from "../hooks/useArticles";
import NavBar from "../common/NavBar";

const BoardsPage = () => {
  const [orderBy, setOrderBy] = useState<string>("recent");
  const [pageSize, setPageSize] = useState<number | null>(null);
  const scrollBoxRef = useRef<HTMLDivElement>(null);

  const { bestArticles, articles, onLoadMore, resetData } = useArticles(
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
    <>
      <NavBar />
      <div className={styles.container} ref={scrollBoxRef}>
        <BestBoardList bestArticles={bestArticles} />
        <BoardList articles={articles} onOrderChange={handleOrderChange} />
      </div>
    </>
  );
};

export default BoardsPage;
