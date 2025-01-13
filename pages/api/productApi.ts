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
}) => {
  try {
    const queryParams = new URLSearchParams({ page, pageSize, orderBy });
    if (keyword) queryParams.set("keyword", keyword);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products?${queryParams}`
    );
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
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}`
    );
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
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}/comments?${queryParams}`
    );
    if (!response.ok) {
      throw new Error("데이터 불러오기 실패");
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

const retryFetch = async (
  url: string,
  options: RequestInit
): Promise<Response> => {
  const response = await fetch(url, options);

  if (response.status === 401) {
    // status === 401 : Unauthorized 토큰 갱신
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refreshToken: localStorage.getItem("refreshToken"),
        }),
      }
    );

    if (refreshResponse.ok) {
      const { accessToken, refreshToken } = await refreshResponse.json();
      // localStorage에 갱신된 토큰 저장
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // requset 재요청
      const newOptions = {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
        },
      };
      return await fetch(url, newOptions);
    } else {
      throw new Error("토큰 갱신 실패. 다시 로그인하세요.");
    }
  }

  return response;
};

const uploadImage = async (file: string) => {
  if (!file) {
    return null; // 이미지가 없으면 null 반환
  }

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await retryFetch(
      `${process.env.NEXT_PUBLIC_UPLOAD_IMAGE_URL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("업로드 실패");
    }

    const data = await response.json(); // 서버의 JSON 응답
    return data.url; // 서버 URL 리턴해서 postArticle API에서 사용
  } catch (error) {
    console.error("이미지 업로드 중 오류 발생:", error);
    return null;
  }
};

const postProduct = async ({ content }: { content: PostProductInterface }) => {
  let imageUrl = null;
  if (content.images) {
    // 이미지 업로드 후 URL 받기
    imageUrl = await uploadImage(content.images[0]);
    content.images = imageUrl ? [imageUrl] : [];
  }

  try {
    const response = await retryFetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(content),
      }
    );

    if (!response.ok) {
      throw new Error("상품 추가 실패");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

const deleteProduct = async (productId: string) => {
  try {
    const response = await retryFetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("상품 삭제 실패");
    }

    return response;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async ({
  id,
  content,
  imageChange,
}: {
  id: string;
  content: PostProductInterface;
  imageChange: boolean;
}) => {
  let imageUrl = null;

  if (content.images && imageChange) {
    // 이미지 업로드 후 URL 받기
    imageUrl = await uploadImage(content.images[0]);
    content.images = imageUrl ? [imageUrl] : [];
  }

  try {
    const response = await retryFetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(content),
      }
    );

    if (!response.ok) {
      throw new Error("상품 업데이트 실패");
    }

    return response.json();
  } catch (error) {
    throw error;
  }
};

const postComment = async (id: string, { content }: { content: string }) => {
  try {
    const response = await retryFetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/products/${id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ content }),
      }
    );
    if (!response.ok) {
      throw new Error("댓글 추가 실패");
    }
  } catch (error) {
    throw error;
  }
};

const updateComment = async (id: string, data: updateCommentInterface) => {
  try {
    const response = await retryFetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("댓글 업데이트 실패");
    }
    return response;
  } catch (error) {
    throw error;
  }
};

const deleteComment = async (id: string) => {
  try {
    const response = await retryFetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );
    if (!response.ok) {
      throw new Error("댓글 삭제 실패");
    }
  } catch (error) {
    throw error;
  }
};

export {
  fetchProducts,
  fetchProductById,
  fetchInquiryById,
  postProduct,
  deleteProduct,
  updateProduct,
  postComment,
  updateComment,
  deleteComment,
};
