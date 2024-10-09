import { useState, useEffect, useCallback } from "react";
import { getProductsList } from "../services/panda-market-api";
import useResponsivePageSize from "./useProductsPageSize";

const useProductsFavorite = () => {
  const [items, setItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const pageSize = useResponsivePageSize({
    mobileSize: 1,
    tabletSize: 2,
    pcSize: 4,
  });

  const order = "favorite";

  const handleLoad = useCallback(async () => {
    const queryParams = {
      pageSize,
      orderBy: order,
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
  }, [pageSize]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return { items, fetchError, isLoading };
};

export default useProductsFavorite;
