import { useEffect, useState } from "react";
import throttle from "lodash/throttle";

// 커스텀 훅: 화면 크기에 따라 디스플레이 개수를 업데이트
const useResponsiveDisplayCount = () => {
  const [bestDisplayCount, setBestDisplayCount] = useState(1); // 베스트 상품 디스플레이 개수
  const [allDisplayCount, setAllDisplayCount] = useState(1); // 전체 상품 디스플레이 개수

  // 디스플레이 개수 업데이트 함수
  const updateDisplayCount = () => {
    const width = window.innerWidth;
    if (width >= 1024) {
      setBestDisplayCount(4);
      setAllDisplayCount(10); // 데스크탑에서 전체 10개
    } else if (width >= 640) {
      setBestDisplayCount(2);
      setAllDisplayCount(6); // 태블릿에서 전체 6개
    } else {
      setBestDisplayCount(1);
      setAllDisplayCount(4); // 모바일에서 전체 4개
    }
  };
  const throttledUpdateDisplayCount = throttle(updateDisplayCount, 100);
  useEffect(() => {
    // 초기 설정
    updateDisplayCount();

    // 윈도우 리사이즈 이벤트 리스너 설정 (스로틀 적용)
    window.addEventListener("resize", throttledUpdateDisplayCount);

    // 컴포넌트 언마운트 시 이벤트 리스너 및 스로틀된 함수 제거
    return () => {
      window.removeEventListener("resize", throttledUpdateDisplayCount);
      throttledUpdateDisplayCount.cancel(); // 스로틀된 함수 취소
    };
  }, []);

  return { bestDisplayCount, allDisplayCount };
};

export default useResponsiveDisplayCount;
