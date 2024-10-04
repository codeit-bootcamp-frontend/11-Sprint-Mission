export async function getProductsList(pageSize = 10) {
  const query = new URLSearchParams({
    pageSize,
  });
  const response = await fetch(`https://panda-market-api.vercel.app/products?${query}`);
  const body = await response.json();
  return body;
}
