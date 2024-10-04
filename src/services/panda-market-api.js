export async function getProductsList({ pageSize = 10, orderBy = "recent", keyword = "", page = 1 }) {
  const query = new URLSearchParams({
    pageSize,
    orderBy,
    keyword,
    page,
  });
  const response = await fetch(`https://panda-market-api.vercel.app/products?${query}`);
  const body = await response.json();
  return body;
}
