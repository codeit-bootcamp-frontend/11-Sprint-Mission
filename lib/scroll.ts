export function setupScrollListener(
  elementRef: React.RefObject<HTMLDivElement>,
  onReachBottom: () => void
): () => void {
  const handleScroll = () => {
    const element = elementRef.current;
    if (element) {
      const { scrollTop, scrollHeight, clientHeight } = element;
      if (scrollTop + clientHeight >= scrollHeight - 1) {
        onReachBottom();
      }
    }
  };

  if (elementRef.current) {
    elementRef.current.addEventListener("scroll", handleScroll);
  }

  return () => {
    if (elementRef.current) {
      elementRef.current.removeEventListener("scroll", handleScroll);
    }
  };
}
