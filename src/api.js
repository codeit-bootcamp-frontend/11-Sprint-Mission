// api.js
export async function getProductList() {
  const response = await fetch("https://panda-market-api.vercel.app/products");
  if (!response.ok) {
    throw new Error("Failed to fetch product list");
  }
  const body = await response.json();
  return body;
}
