import { useState, useEffect, useCallback } from "react";
import { getProductsList } from "../services/panda-market-api";
import useResponsivePageSize from "./useProductsPageSize";
import useAsyncRequest from "./useAsyncRequest";

const useProductsAll = ({ order, search }) => {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const { execute, isLoading, error: fetchError } = useAsyncRequest();

  const pageSize = useResponsivePageSize({
    mobileSize: 4,
    tabletSize: 6,
    pcSize: 10,
  });

  const handleLoad = useCallback(async () => {
    const queryParams = {
      pageSize,
      keyword: search,
      orderBy: order,
      page: currentPage,
    };

    execute(async () => {
      const result = await getProductsList(queryParams);
      if (!result) return;
      setItems(result.list);
      setTotal(result.totalCount);
    });
  }, [execute, pageSize, search, order, currentPage]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return {
    items,
    total,
    currentPage,
    setCurrentPage,
    isLoading,
    fetchError,
    pageSize,
  };
};

export default useProductsAll;
