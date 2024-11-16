import { useCallback, useState } from 'react';

/**
 * api 함수 wrapper - 로딩 및 에러 처리
 * @param {function} asyncFunction : 비동기 함수(api)
 * @returns {[boolean, object, function]} : pending, error, wrappedFunction
 */
function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
): [boolean, Error | null, (...args: any[]) => Promise<T | undefined>] {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const wrappedFunction = useCallback(
    async (...args: any[]) => {
      try {
        setError(null);
        setPending(true);
        return await asyncFunction(...args);
      } catch (error) {
        setError(error as Error);
        console.error(error);
        return;
      } finally {
        setPending(false);
      }
    },
    [asyncFunction],
  );

  return [pending, error, wrappedFunction];
}

export default useAsync;
