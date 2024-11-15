const BASE_URL = "https://panda-market-api.vercel.app/";

export async function fetchProducts(params = {}) {
  const query = new URLSearchParams(params).toString();
  try {
    const response = await fetch(`${BASE_URL}products?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
}

export async function fetchProductDetail(productId) {
  try {
    const response = await fetch(`${BASE_URL}products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error fetching product details: ", error);
    throw error;
  }
}

export async function fetchComments(productId, params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `${BASE_URL}products/${productId}/comments?${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}
