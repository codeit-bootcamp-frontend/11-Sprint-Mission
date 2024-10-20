export async function fetchDetailItem(itemId) {
  const url = `https://panda-market-api.vercel.app/products/${itemId}/`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json(); // React Query가 데이터를 캐싱할 때 사용
}
