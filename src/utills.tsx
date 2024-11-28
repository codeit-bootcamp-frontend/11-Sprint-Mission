import { debounce } from 'lodash';
import { Fragment, useEffect } from 'react';

export const getPageLimit = () => {
  if (window.innerWidth <= 767) return [1, 4];
  if (window.innerWidth <= 1199) return [2, 6];
  return [4, 10];
};

export function renderLines(text: string) {
  return text.split('<br />').map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));
}

export function useResize(callback: () => void, delay = 250) {
  useEffect(() => {
    const debouncedHandleRezied = debounce(callback, delay);

    window.addEventListener('resize', debouncedHandleRezied);

    callback();

    return () => {
      window.removeEventListener('resize', debouncedHandleRezied);
      debouncedHandleRezied.cancel();
    };
  }, [callback, delay]);
}

export function getTimeDifference(isoString: string) {
  const now = new Date();
  const past = new Date(isoString);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return '방금 전';
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `${minutes}분 전`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `${hours}시간 전`;
  } else {
    const days = Math.floor(diffInSeconds / 86400);
    return `${days}일 전`;
  }
}
