// 상품 전체 목록
export async function getProductList() {
  const response = await fetch("https://panda-market-api.vercel.app/products");
  const body = await response.json();
  return body;
}

export async function getBestProductList() {
  const response = await fetch(
    "https://panda-market-api.vercel.app/products?page=1&pageSize=4&orderBy=favorite"
  );
  const body = await response.json();
  return body;
}
