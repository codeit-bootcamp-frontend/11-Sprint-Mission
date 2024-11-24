import { useEffect, useState } from "react";

function useResponsivePageSize() {
  const [pageSize, setPageSize] = useState(3);

  useEffect(() => {
    if (typeof window === "undefined") return;

    function updatePageSize() {
      const width = window.innerWidth;

      if (width >= 1280) {
        setPageSize(3);
      } else if (width >= 768) {
        setPageSize(2);
      } else {
        setPageSize(1);
      }
    }

    updatePageSize();

    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  return pageSize;
}

export default useResponsivePageSize;
