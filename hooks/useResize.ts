import { useState, useEffect } from 'react';

export type ScreenType = 'mobile' | 'tablet' | 'desktop' | null;

const useResize = () => {
  const [screenType, setScreenType] = useState<ScreenType>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // 클라이언트에서만 실행되도록 설정, 서버에서는 window객체 x
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const handleResize = () => {
      const currentWidth = window.innerWidth;

      if (currentWidth >= 1024) {
        setScreenType('desktop');
      } else if (currentWidth >= 768) {
        setScreenType('tablet');
      } else {
        setScreenType('mobile');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 크기 설정

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  return screenType;
};

export default useResize;
