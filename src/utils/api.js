const SERVER_URL = "https://panda-market-api.vercel.app/products";

export const fetchProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) => {
  try {
    const queryParams = new URLSearchParams({ page, pageSize, orderBy });
    if (keyword) queryParams.set("keyword", encodeURIComponent(keyword));

    const response = await fetch(
      // `${SERVER_URL}?page=${page}&pageSize=${pageSize}&orderBy=${order}`
      `${SERVER_URL}?${queryParams}`
    );
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export default fetchProducts;
