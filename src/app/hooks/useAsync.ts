import { useState, useCallback } from 'react';

/**
 * 예외 처리를 위한 커스텀 훅입니다.
 * @param {Function} asyncFunction - 실행할 비동기 함수
 *
 * @returns {Object} - 상태 및 함수를 포함한 객체 (아래 네 가지를 포함하고 있음)
 * @returns {boolean} isLoading - 함수 실행 중인지 여부
 * @returns {string | null} error - 발생한 오류 메시지
 * @returns {Function} wrappedFunction - 비동기 함수를 호출하는 함수
 * @returns {Object | null} data - 비동기 함수의 반환 데이터
 */

export default function useAsync<TArg, TReturn>(
  asyncFunction: (arg?: TArg) => Promise<TReturn>
) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const wrappedFunction = useCallback(
    async (arg?: TArg) => {
      setIsLoading(true);
      setError(null);

      try {
        return await asyncFunction(arg);
      } catch (error) {
        const err = error as Error;
        setError(err.message);
        return;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFunction]
  );

  return { isLoading, error, wrappedFunction };
}
