import { useState, useEffect, useCallback } from "react";

const useReSizing = ({ mobileSize, tabletSize, pcSize }) => {
  // 초기값을 계산하는 함수
  const getInitialSize = () => {
    if (window.innerWidth <= 767) {
      return mobileSize;
    } else if (window.innerWidth <= 1199) {
      return tabletSize;
    }
    return pcSize;
  };

  const [pageSize, setPageSize] = useState(getInitialSize);

  // 화면 크기가 변경될 때 마다 실행되는 함수
  const updateResponsiveSize = useCallback(() => {
    if (window.matchMedia("(max-width: 767px)").matches) {
      return mobileSize;
    } else if (window.matchMedia("(max-width: 1199px)").matches) {
      return tabletSize;
    }
    return pcSize;
  }, [mobileSize, tabletSize, pcSize]);

  const handleResize = useCallback(() => {
    setPageSize(updateResponsiveSize());
  }, [updateResponsiveSize]);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  return pageSize;
};

export default useReSizing;
