import { useState, useEffect, useCallback } from "react";
import { getProductsList } from "../services/panda-market-api";
import useResponsivePageSize from "./useProductsPageSize";

const useProductsFavorite = (orderBy = "favorite") => {
  const [items, setItems] = useState([]);
  const [loadingError, setLoadingError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pageSize = useResponsivePageSize({
    mobileSize: 1,
    tabletSize: 2,
    pcSize: 4,
  });

  const handleLoad = useCallback(async () => {
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
  }, [pageSize, orderBy]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return { items, loadingError, isLoading };
};

export default useProductsFavorite;
