import debounce from 'lodash.debounce';
import { useState, useEffect } from 'react';

export type ScreenType = 'mobile' | 'tablet' | 'desktop' | null;

const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024,
} as const;

const useResize = () => {
  const [screenType, setScreenType] = useState<ScreenType>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = debounce(() => {
      const currentWidth = window.innerWidth;

      if (currentWidth >= BREAKPOINTS.desktop) {
        setScreenType('desktop');
      } else if (currentWidth >= BREAKPOINTS.tablet) {
        setScreenType('tablet');
      } else {
        setScreenType('mobile');
      }
    }, 250);

    window.addEventListener('resize', handleResize);
    handleResize(); // 초기 크기 설정

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isClient]);

  return screenType;
};

export default useResize;
