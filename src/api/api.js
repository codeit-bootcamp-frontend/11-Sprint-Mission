export async function getProductList({
  page = 1,
  pageSize = 10,
  orderBy = "",
  keyword = "",
}) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const body = await response.json();
  return body;
}

export async function getProductDetail({ productId = 1 }) {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products/${productId}`
  );
  const body = await response.json();
  return body;
}

export async function getProductComment({ productId = 1, limit = 3 }) {
  const response = await fetch(
    `https://panda-market-api.vercel.app/products/${productId}/comments?limit=${limit}`
  );
  const body = await response.json();
  return body;
}
