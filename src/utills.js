import { debounce } from "lodash";
import { Fragment, useEffect } from "react";

export const getPageLimit = () => {
  if (window.innerWidth <= 767) return [1, 4];
  if (window.innerWidth <= 1199) return [2, 6];
  return [4, 10];
};

export function renderLines(text) {
  return text.split("<br />").map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));
}

export function useResize(callback, delay = 250) {
  useEffect(() => {
    const debouncedHandleRezied = debounce(callback, delay);

    window.addEventListener("resize", debouncedHandleRezied);

    callback();

    return () => {
      window.removeEventListener("resize", debouncedHandleRezied);
      debouncedHandleRezied.cancel();
    };
  }, [callback, delay]);
}
