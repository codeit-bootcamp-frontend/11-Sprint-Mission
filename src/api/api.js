const BASE_URL = "https://panda-market-api.vercel.app";

export async function getList({ page = 1, pageSize = 10, orderBy = "recent" }) {
  const query = `page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  const response = await fetch(`${BASE_URL}/products?${query}`);
  if (!response.ok) {
    throw new Error("페이지를 불러오지 못했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function getItem({ productId = 1 }) {
  const response = await fetch(`${BASE_URL}/products/${productId}`);
  if (!response.ok) {
    throw new Error("상품 정보를 불러오지 못했습니다.");
  }
  const body = await response.json();
  return body;
}

export async function getComment({ productId = 1, limit = 3 }) {
  const response = await fetch(
    `${BASE_URL}/products/${productId}/comments?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("상품 상세페이지를 불러오지 못했습니다.");
  }
  const body = await response.json();
  return body;
}

// export async function getMessage({ productId = 1 }, formData) {
//   const response = await fetch(`${BASE_URL}/products/${productId}/comments`, {
//     method: "POST",
//     body: formData,
//   });
//   if (!response.ok) {
//     throw new Error("문의사항을 수정하지 못했습니다.");
//   }
//   const body = await response.json();
//   return body;
// } 진행중...
