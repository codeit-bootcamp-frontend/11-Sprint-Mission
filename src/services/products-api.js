export async function getProductsList({
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
  page = 1,
}) {
  const query = new URLSearchParams({
    pageSize,
    orderBy,
    keyword,
    page,
  });
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  if (!response.ok) {
    throw new Error("상품 목록을 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function addProductsList(productData) {
  const response = await fetch(`https://panda-market-api.vercel.app/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    throw new Error("상품을 등록하는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function getProductsDetail(productId) {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products/${productId}`
  );
  if (!response.ok) {
    throw new Error("상품 상세페이지를 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function getProductsDetailComments(productId, limit = 100) {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products/${productId}/comments?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("상품 상세페이지 댓글을 불러오는데 실패했습니다.");
  }
  const body = await response.json();
  return body;
}
