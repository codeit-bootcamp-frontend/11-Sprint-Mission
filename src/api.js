export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`,
  );
  if (!response.ok) {
    throw new Error('정보를 불러오는데 실패했습니다.');
  }
  const body = await response.json();
  return body;
}
