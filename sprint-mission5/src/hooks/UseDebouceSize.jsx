import debounce from "lodash/debounce";
import { useEffect, useState } from "react";

const getPageSize = (isBestItem) => {
  const width = window.innerWidth;
  if (width < 767) return isBestItem ? 1 : 4;
  if (width < 1279) return isBestItem ? 2 : 6;
  return isBestItem ? 4 : 10;
};

const useHandleResize = (isBestItem, delay = 250) => {
  const [pageSize, setPageSize] = useState(getPageSize(isBestItem));
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = debounce(() => {
      setPageSize(getPageSize(isBestItem));
      setIsMobile(window.innerWidth <= 767);
    }, delay);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, [isBestItem, delay]);

  return { pageSize, isMobile };
};

export default useHandleResize;
