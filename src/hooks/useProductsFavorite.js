import { useState, useEffect } from "react";
import { getProductsList } from "../services/panda-market-api";

const useProductsFavorite = (initialPageSize = 4, orderBy = "favorite") => {
  const [items, setItems] = useState([]);
  const [loadingError, setLoadingError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // 화면 크기에 따라 pageSize 설정
  useEffect(() => {
    const handleResize = () => {
      if (window.matchMedia("(max-width: 767px)").matches) {
        setPageSize(1); // 모바일
      } else if (window.matchMedia("(max-width: 1199px)").matches) {
        setPageSize(2); // 태블릿
      } else {
        setPageSize(initialPageSize); // PC
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [initialPageSize]);

  // 데이터를 로드하는 함수
  useEffect(() => {
    const handleLoad = async () => {
      const queryParams = {
        pageSize,
        orderBy,
      };
      try {
        setIsLoading(true);
        setLoadingError(null);
        const result = await getProductsList(queryParams);
        setItems(result.list);
      } catch (error) {
        setLoadingError(error);
      } finally {
        setIsLoading(false);
      }
    };

    handleLoad();
  }, [pageSize, orderBy]);

  return { items, loadingError, isLoading };
};

export default useProductsFavorite;
