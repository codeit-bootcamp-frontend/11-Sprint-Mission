const SERVER_URL = "https://panda-market-api.vercel.app";

interface PostProductInterface {
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
}

export interface updateCommentInterface {
  content: string;
}

const fetchProducts = async ({
  page = "1",
  pageSize = "10",
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

const fetchProductById = async (id: string) => {
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

const fetchInquiryById = async (id: string, cursor: string | null = null) => {
  try {
    const queryParams = new URLSearchParams({ limit: "5" });
    if (cursor) queryParams.set("cursor", cursor);
    const response = await fetch(
      `${SERVER_URL}/products/${id}/comments?${queryParams}`
    );
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const postProduct = async ({ content }: { content: PostProductInterface }) => {
  try {
    const response = await fetch(`${SERVER_URL}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: 'Jwt Token'
      },
      body: JSON.stringify(content),
    });
    if (!response.ok) {
      throw new Error("상품 추가 실패");
    }
  } catch (error) {
    throw error;
  }
};

const postComment = async (id: string, { content }: { content: string }) => {
  try {
    const response = await fetch(`${SERVER_URL}/products/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: 'Jwt Token'
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error("댓글 추가 실패");
    }
  } catch (error) {
    throw error;
  }
};

const updateComment = async (id: string, data: updateCommentInterface) => {
  try {
    const response = await fetch(`${SERVER_URL}/comments/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Authorization: 'Jwt Token'
      },
      body: JSON.stringify({ data }),
    });
    if (!response.ok) {
      throw new Error("댓글 업데이트 실패");
    }
    return response;
  } catch (error) {
    throw error;
  }
};

export {
  fetchProducts,
  fetchProductById,
  fetchInquiryById,
  postProduct,
  postComment,
  updateComment,
};
