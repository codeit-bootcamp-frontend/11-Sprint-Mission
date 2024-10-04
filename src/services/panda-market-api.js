export async function getProductsList({ pageSize = 10, orderBy = "recent", keyword = "", page = 1 }) {
  const query = new URLSearchParams({
    pageSize,
    orderBy,
    keyword,
    page,
  });
  const response = await fetch(`https://panda-market-api.vercel.app/products?${query}`);
  if (!response.ok) {
    throw new Error("상품 목록을 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
