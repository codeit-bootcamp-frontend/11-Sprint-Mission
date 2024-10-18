export async function getProducts({
  page = "",
  pageSize = "",
  orderBy = "",
  keyword = "",
}) {
  const params = new URLSearchParams({ page, pageSize, orderBy, keyword });

  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products?${params}`
    );
    if (!response.ok) {
      throw new Error("서버에서 오류 응답을 받았습니다.");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }
}

export async function getProductsById(productId) {
  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products/${productId}`
    );
    if (!response.ok) {
      throw new Error("서버에서 오류 응답을 받았습니다.");
    }
    const body = await response.json();
    console.log(body);
    return body;
  } catch (error) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }
}

export async function getCommentsById(productId, { limit = "" }) {
  const params = new URLSearchParams({ limit });

  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products/${productId}/comments?${params}`
    );
    if (!response.ok) {
      throw new Error("서버에서 오류 응답을 받았습니다.");
    }
    const body = await response.json();
    return body;
  } catch (error) {
    throw new Error("데이터를 불러오는데 실패했습니다.");
  }
}
