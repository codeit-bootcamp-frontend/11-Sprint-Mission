import { useCallback, useState } from "react";

function useAsync(asyncFuntion) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = useCallback(
    async (...args) => {
      try {
        setError(null);
        setPending(true);
        return await asyncFuntion(...args);
      } catch (error) {
        setError(error);
        return;
      } finally {
        setPending(false);
      }
    },
    [asyncFuntion]
  );
  return [pending, error, wrappedFunction];
}

export default useAsync;
