const BASE_URL = "https://panda-market-api.vercel.app/products";

async function fetchProducts(params) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${BASE_URL}?${query}`);

  if (!response.ok) {
    throw new Error(
      `상품 데이터를 불러오는데 실패했습니다. 상태 코드: ${response.status}`
    );
  }

  return response.json();
}

export async function getBestProducts({ pageSize = 4 } = {}) {
  try {
    return await fetchProducts({ page: 1, pageSize, orderBy: "favorite" });
  } catch (error) {
    console.error("베스트 상품 데이터 불러오기 실패:", error);
    throw error;
  }
}

export async function getAllProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
} = {}) {
  try {
    return await fetchProducts({ page, pageSize, orderBy });
  } catch (error) {
    console.error("전체 상품 데이터 불러오기 실패:", error);
    throw error;
  }
}