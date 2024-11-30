import { useMemo } from 'react';
import useInnerWidth from './useInnerWidth';

interface useReSizingProps {
  mobileSize: any;
  tabletSize: any;
  pcSize: any;
}

const useReSizing = ({ mobileSize, tabletSize, pcSize }: useReSizingProps) => {
  const innerWidth = useInnerWidth();

  const pageSize = useMemo(() => {
    if (innerWidth <= 767) {
      return mobileSize;
    } else if (innerWidth <= 1248) {
      return tabletSize;
    }
    return pcSize;
  }, [innerWidth, mobileSize, tabletSize, pcSize]);

  return pageSize;
};

export default useReSizing;
