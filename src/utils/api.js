const SERVER_URL = "https://panda-market-api.vercel.app/products";

const fetchProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) => {
  try {
    const queryParams = new URLSearchParams({ page, pageSize, orderBy });
    if (keyword) queryParams.set("keyword", keyword);

    const response = await fetch(`${SERVER_URL}?${queryParams}`);
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/${id}`);
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const fetchInquiryById = async (id) => {
  try {
    const response = await fetch(`${SERVER_URL}/${id}/comments?limit=5`);
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

export { fetchProducts, fetchProductById, fetchInquiryById };
