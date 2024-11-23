import { useEffect, useCallback, useRef } from "react";

function useDebounce(callback, delay) {
  const callbackRef = useRef(callback);
  const timeoutRef = useRef(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(
        () => callbackRef.current(...args),
        delay
      );
    },
    [delay]
  );
}
export default useDebounce;
