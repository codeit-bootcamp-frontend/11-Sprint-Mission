const SERVER_URL = "https://panda-market-api.vercel.app";

const fetchProducts = async ({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
  keyword = "",
} = {}) => {
  try {
    const queryParams = new URLSearchParams({ page, pageSize, orderBy });
    if (keyword) queryParams.set("keyword", keyword);

    const response = await fetch(`${SERVER_URL}/products?${queryParams}`);
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
    const response = await fetch(`${SERVER_URL}/products/${id}`);
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
    const response = await fetch(
      `${SERVER_URL}/products/${id}/comments?limit=5`
    );
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const updateComment = async (id, { content }) => {
  try {
    const response = await fetch(`${SERVER_URL}/comments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        comment: JSON.stringify({ content }),
      },
    });
    if (!response.ok) {
      throw new Error("업데이트 실패");
    }
  } catch (error) {
    throw error;
  }
};

export { fetchProducts, fetchProductById, fetchInquiryById, updateComment };
