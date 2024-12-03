export default function getPageSize(context = "default") {
  if (typeof window === "undefined") return context === "default" ? 3 : 10;

  const width = window.innerWidth;

  if (context === "article") {
    if (width < 768) return 1;
    if (width < 1280) return 2;
    return 3;
  }

  if (context === "item") {
    if (width < 768) return 1;
    if (width < 1280) return 2;
    return 4;
  }

  if (width < 768) return 4;
  if (width < 1280) return 6;
  return 10;
}
