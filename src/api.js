const BASE_URL = process.env.REACT_APP_BASE_URL;

export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${BASE_URL}/products?${query}`);
  if (!response.ok) {
    throw new Error("정보를 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
