import { useState, useEffect } from 'react';

const useInnerWidth = () => {
  const [innerWidth, setInnerWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  useEffect(() => {
    const handleResize = () => {
      setInnerWidth(window.innerWidth);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  console.log('innerWidth:', innerWidth);
  return innerWidth;
};

export default useInnerWidth;
