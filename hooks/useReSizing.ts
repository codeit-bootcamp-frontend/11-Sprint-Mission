import { useState, useEffect, useCallback } from 'react';

interface useReSizingProps {
  mobileSize: number;
  tabletSize: number;
  pcSize: number;
}

const useReSizing = ({ mobileSize, tabletSize, pcSize }: useReSizingProps) => {
  // 서버 렌더링에서는 기본값을 반환
  const [pageSize, setPageSize] = useState(() => {
    if (typeof window === 'undefined') {
      // SSR 단계에서는 PC 크기를 기본값으로 설정
      return pcSize;
    }
    // 클라이언트에서 초기 계산 실행
    if (window.innerWidth <= 767) return mobileSize;
    if (window.innerWidth <= 1248) return tabletSize;
    return pcSize;
  });

  // 클라이언트 전용 페이지 크기 계산 함수
  const calculatePageSize = useCallback(() => {
    if (window.innerWidth <= 767) {
      return mobileSize;
    } else if (window.innerWidth <= 1248) {
      return tabletSize;
    }
    return pcSize;
  }, [mobileSize, tabletSize, pcSize]);

  useEffect(() => {
    const handleResize = () => {
      setPageSize(calculatePageSize());
    };

    // 클라이언트 환경에서 이벤트 등록
    handleResize(); // 초기 실행
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculatePageSize]);

  return pageSize;
};

export default useReSizing;
