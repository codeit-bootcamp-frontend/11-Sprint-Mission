import { useState, useEffect, useCallback } from "react";
import { getProductsList } from "../services/panda-market-api";
import useResponsivePageSize from "./useProductsPageSize";

const useProductsAll = () => {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("recent");
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingError, setLoadingError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      setSearchError(null);
      result = await getProductsList(queryParams);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }
    const { list, totalCount } = result;
    setItems(list);
    setTotal(totalCount);
  }, [pageSize, search, order, currentPage]);

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
    loadingError,
    pageSize,
    handleSearchSubmit,
    handleBestClick,
    handleNewestClick,
    searchError,
  };
};

export default useProductsAll;
