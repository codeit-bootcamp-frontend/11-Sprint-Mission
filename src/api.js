export async function fetchProducts() {
  try {
    const response = await fetch(
      "https://panda-market-api.vercel.app/products"
    );
    const jsonData = await response.json();
    return jsonData.list;
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error);
    throw error;
  }
}
