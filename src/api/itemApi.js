const API_BASE_URL = 'https://panda-market-api.vercel.app';

export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  try {
    const response = await fetch(
      `${API_BASE_URL}/products?${query}`
    );
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

export async function getProductDetail(productId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}`
    );
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch product detail:", error);
    throw error;
  }
}

export async function getProductComments({ productId, params }) {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}/comments?${query}`
    );
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Failed to fetch product comments:", error);
    throw error;
  }
}
