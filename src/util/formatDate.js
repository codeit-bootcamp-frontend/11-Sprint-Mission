
export function formatDate(isoDate) {
  const date = new Date(isoDate);
  
  return date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
