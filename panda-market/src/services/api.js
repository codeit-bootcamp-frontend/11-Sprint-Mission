// 상품 전체 목록
export async function getProductList() {
  const response = await fetch("https://panda-market-api.vercel.app/products");
  if (!response.ok) {
    throw new Error("리뷰를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}

export async function getBestProductList() {
  const response = await fetch(
    "https://panda-market-api.vercel.app/products?page=1&pageSize=4&orderBy=favorite"
  );
  if (!response.ok) {
    throw new Error("리뷰를 불러오는데 실패했습니다");
  }
  const body = await response.json();
  return body;
}
