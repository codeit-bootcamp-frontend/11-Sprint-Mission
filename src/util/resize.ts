export function getPageSize(width: number): number {
  if (width > 744) {
    return 3;
  } else if (width > 376) {
    return 2;
  } else {
    return 1;
  }
}

export function setupResizeListener(
  callback: (pageSize: number) => void
): () => void {
  const handleResize = () => {
    const pageSize = getPageSize(window.innerWidth);
    callback(pageSize);
  };

  window.addEventListener("resize", handleResize);

  handleResize();

  return () => {
    window.removeEventListener("resize", handleResize);
  };
}
