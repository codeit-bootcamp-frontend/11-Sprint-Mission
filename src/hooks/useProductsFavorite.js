import { useState, useEffect, useCallback } from "react";
import { getProductsList } from "../services/products-api";
import useReSizing from "./useReSizing";
import useAsyncRequest from "./useAsyncRequest";

const useProductsFavorite = () => {
  const [items, setItems] = useState([]);
  const { execute, isLoading, error: fetchError } = useAsyncRequest();

  const pageSize = useReSizing({
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

    await execute(async () => {
      const result = await getProductsList(queryParams);
      if (!result) return;
      setItems(result.list);
    });
  }, [execute, pageSize]);

  useEffect(() => {
    handleLoad();
  }, [handleLoad]);

  return { items, fetchError, isLoading };
};

export default useProductsFavorite;
