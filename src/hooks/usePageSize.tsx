import { useState, useEffect } from "react";

function usePageSize(): number {
  const getPageSize = (width: number): number => {
    if (width >= 1200) {
      return 10;
    } else if (width >= 768) {
      return 6;
    } else {
      return 4;
    }
  };

  const [pageSize, setPageSize] = useState<number>(
    getPageSize(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setPageSize(getPageSize(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return pageSize;
}

export default usePageSize;
