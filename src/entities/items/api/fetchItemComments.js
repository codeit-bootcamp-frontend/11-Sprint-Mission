export async function fetchItemComments(itemId) {
  const url = `https://panda-market-api.vercel.app/products/${itemId}/comments?limit=10`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return response.json();
}
