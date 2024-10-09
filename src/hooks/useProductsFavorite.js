import { useState, useEffect, useCallback } from "react";
import { getProductsList } from "../services/panda-market-api";
import useResponsivePageSize from "./useProductsPageSize";

const useProductsFavorite = (orderBy = "favorite") => {
  const [items, setItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
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
      setFetchError(null);
      const result = await getProductsList(queryParams);
      setItems(result.list);
    } catch (error) {
      setFetchError(error);
      return;
    } finally {
      setIsLoading(false);
    }
  }, [pageSize, orderBy]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return { items, fetchError, isLoading };
};

export default useProductsFavorite;
