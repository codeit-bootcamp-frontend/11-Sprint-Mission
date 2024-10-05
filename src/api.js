export async function getProducts() {
  const res = await fetch("https://panda-market-api.vercel.app/products");
  const data = await res.json();
  return data;
}
