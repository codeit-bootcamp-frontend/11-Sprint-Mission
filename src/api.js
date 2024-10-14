import instance from "./axiosInstance";

export async function getProducts(params = {}) {
  try {
    const response = await instance.get("/products", {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("정보를 불러오는데 실패했습니다.");
  }
}

export async function getProductDetail(productId) {
  try {
    const response = await instance.get(`/products/${productId}`);
    return response.data;
  } catch (error) {
    throw new Error("상품 상세 정보를 불러오는데 실패했습니다.");
  }
}
