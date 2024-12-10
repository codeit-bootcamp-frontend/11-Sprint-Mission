type Context = "default" | "article" | "item";

const pageSize: Record<
  Context,
  { small: number; medium: number; large: number }
> = {
  article: { small: 1, medium: 2, large: 3 },
  item: { small: 1, medium: 2, large: 4 },
  default: { small: 4, medium: 6, large: 10 },
};

export default function getPageSize(context: Context = "default"): number {
  if (typeof window === "undefined") {
    return context === "default" ? 3 : 10;
  }

  const width = window.innerWidth;
  const size = pageSize[context];

  if (width < 768) return size.small;
  if (width < 1280) return size.medium;
  return size.large;
}
