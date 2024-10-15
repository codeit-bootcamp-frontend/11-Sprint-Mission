const BASE_URL = "https://panda-market-api.vercel.app";

export async function getProducts({ order = "recent" }) {
  const query = `order=${order}`;
  const response = await fetch(`${BASE_URL}/products?${query}`);
  if (!response.ok) {
    throw new Error("상품을 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}
