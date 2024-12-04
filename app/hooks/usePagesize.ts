import { useEffect, useState } from "react";

type PageSizeType = "mobile" | "tablet" | "desktop";

function usePageSize(): PageSizeType {
  const [pageSize, setPageSize] = useState<PageSizeType>("desktop");

  useEffect(() => {
    if (typeof window === "undefined") return;

    function updatePageSize() {
      const width = window.innerWidth;

      if (width >= 1280) {
        setPageSize("desktop");
      } else if (width >= 768) {
        setPageSize("tablet");
      } else {
        setPageSize("mobile");
      }
    }

    updatePageSize();

    window.addEventListener("resize", updatePageSize);
    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  return pageSize;
}

export default usePageSize;
