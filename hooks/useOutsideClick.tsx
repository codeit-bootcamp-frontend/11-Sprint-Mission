import { RefObject, useCallback, useEffect, useState } from "react";

const useOutsideClick = <T extends HTMLElement>(ref: RefObject<T>) => {
  const [flag, setFlag] = useState(true);

  const handler = useCallback(
    (event: MouseEvent) => {
      if (ref?.current && ref.current.contains(event.target as Node)) {
        setFlag(false);
        return;
      }
      setFlag(true);
    },
    [ref]
  );

  useEffect(() => {
    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [handler]);

  return { flag };
};

export default useOutsideClick;
