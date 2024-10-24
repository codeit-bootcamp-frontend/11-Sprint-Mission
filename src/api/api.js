export async function getProducts(order = "createdAt") {
  const query = "order=${order}";
  const response = await fetch(
    `https://panda-market-api.vercel.app/products?${query}`
  );
  const body = await response.json();
  return body;
}

const API_BASE_URL = "https://panda-market-api.vercel.app";

// 상품상세정보
export const getDetail = async (productId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);
    if (!response.ok) {
      throw new Error("오류 응답");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("실패", error);
    throw error;
  }
};

// 댓글
export const getDetailComment = async (productId) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}/comments`
    );
    if (!response.ok) {
      throw new Error("오류응답");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("실패", error);
    throw error;
  }
};

export const postComment = async (productId, comment) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/product/${productId}/comments`,
      { text: comment }
    );
    return response.data;
  } catch (error) {
    console.error("실패", error);
    throw error;
  }
};
