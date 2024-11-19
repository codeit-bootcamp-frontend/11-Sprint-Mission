import { useState, useEffect, useCallback } from 'react';

interface useReSizingProps {
  mobileSize: number;
  tabletSize: number;
  pcSize: number;
}

const useReSizing = ({ mobileSize, tabletSize, pcSize }: useReSizingProps) => {
  // 현재 화면 크기에 맞는 페이지 크기 계산 함수
  const calculatePageSize = useCallback(() => {
    if (window.innerWidth <= 767) {
      return mobileSize;
    } else if (window.innerWidth <= 1248) {
      return tabletSize;
    }
    return pcSize;
  }, [mobileSize, tabletSize, pcSize]);

  const [pageSize, setPageSize] = useState(calculatePageSize);

  const handleResize = useCallback(() => {
    setPageSize(calculatePageSize());
  }, [calculatePageSize]);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return pageSize;
};

export default useReSizing;
