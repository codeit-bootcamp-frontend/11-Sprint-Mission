import { useCallback, useState } from 'react';

/**
 * api 함수 wrapper - 로딩 및 에러 처리
 * @param {function} asyncFunction : 비동기 함수(api)
 * @returns {[boolean, object, function]} : pending, error, wrappedFunction
 */
function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = useCallback(
    async (...args) => {
      try {
        setError(null);
        setPending(true);
        return await asyncFunction(...args);
      } catch (error) {
        setError(error);
        return;
      } finally {
        setPending(false);
      }
    },
    [asyncFunction]
  );

  return [pending, error, wrappedFunction];
}

export default useAsync;
