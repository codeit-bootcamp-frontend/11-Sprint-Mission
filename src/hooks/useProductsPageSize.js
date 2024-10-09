import { useState, useEffect, useCallback } from "react";

const useResponsivePageSize = ({ mobileSize, tabletSize, pcSize }) => {
  const [pageSize, setPageSize] = useState(pcSize);

  const getListItemCountByScreenSize = useCallback(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      return mobileSize;
    } else if (window.matchMedia("(max-width: 1199px)").matches) {
      return tabletSize;
    }
    return pcSize;
  }, [mobileSize, tabletSize, pcSize]);

  const handleResize = useCallback(() => {
    setPageSize(getListItemCountByScreenSize());
  }, [getListItemCountByScreenSize]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return pageSize;
};

export default useResponsivePageSize;
