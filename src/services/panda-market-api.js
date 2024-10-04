export async function getProductsList({ pageSize = 10, orderBy = "recent" }) {
  const query = new URLSearchParams({
    pageSize,
    orderBy,
  });
  const response = await fetch(`https://panda-market-api.vercel.app/products?${query}`);
  const body = await response.json();
  return body;
}
