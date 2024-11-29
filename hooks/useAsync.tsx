import { useCallback, useState } from "react";

export default function useAsync<T, R>(
  asyncFunction: (parmas: T) => Promise<R>
) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const excute = useCallback(async (params: T) => {
    try {
      setLoading(true);
      setError(null);
      return await asyncFunction(params);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { excute, loading, error };
}
