// useAsyncRequest.js
import { useState, useCallback } from 'react';

const useAsyncRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(async (asyncFunction: () => any) => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await asyncFunction();
      return response;
    } catch (err) {
      const error =
        err instanceof Error ? err : new Error('알 수 없는 오류 발생');
      setError(error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { execute, isLoading, error };
};

export default useAsyncRequest;
