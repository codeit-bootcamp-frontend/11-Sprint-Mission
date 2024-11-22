import BestBoardList from "@/components/boards/BestBoardList";
import BoardList from "@/components/boards/BoardList";
import axios from "@/lib/axios";
import React, { useEffect, useState } from "react";

const Article = () => {
  const [bestArticles, setBestArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [orderBy, setOrderBy] = useState("recent");
  const [pageSize, setPageSize] = useState(getPageSize(window.innerWidth));

  function getPageSize(width: number) {
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

    window.addEventListener("resize", handleResize);

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  async function getBestArticles() {
    try {
      const res = await axios.get(
        `/articles?page=1&pageSize=${pageSize}&orderBy=like`
      );
      const nextArticles = res.data.list;
      setBestArticles(nextArticles);
    } catch (error) {
      console.error("데이터를 불러오는데 실패했습니다:", error);
    }
  }

  useEffect(() => {
    getBestArticles();
  }, [pageSize]);

  useEffect(() => {
    getArticles();
  }, []);

  async function getArticles() {
    try {
      const res = await axios.get(
        `/articles?page=1&pageSize=100&orderBy=${orderBy}`
      );
      const nextArticles = res.data.list;
      setArticles(nextArticles);
    } catch (error) {
      console.error("데이터를 불러오는데 실패했습니다:", error);
    }
  }

  return (
    <div>
      <BestBoardList />
      <BoardList />
    </div>
  );
};

export default Article;
