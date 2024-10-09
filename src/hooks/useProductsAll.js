import { useState, useEffect, useCallback } from "react";
import { getProductsList } from "../services/panda-market-api";
import useResponsivePageSize from "./useProductsPageSize";
import useAsyncRequest from "./useAsyncRequest";

const useProductsAll = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [searchError, setSearchError] = useState(null);
  const [order, setOrder] = useState("recent");
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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target["search"].value.trim();
    if (items.length === 0) {
      setSearchError({ search });
    }
    setSearch(searchValue);
    setCurrentPage(1);
  };

  const handleBestClick = () => setOrder("favorite");
  const handleNewestClick = () => setOrder("recent");

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
    handleSearchSubmit,
    handleBestClick,
    handleNewestClick,
    searchError,
  };
};

export default useProductsAll;
