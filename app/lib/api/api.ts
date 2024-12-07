const BASE_URL = "https://panda-market-api.vercel.app/";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
  tags?: string[];
  favoriteCount?: number;
}

export interface Comment {
  id: number;
  content: string;
  writer: {
    nickname: string;
    image: string | null;
  };
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  totalCount: number;
  page: number;
  limit: number;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  image?: string;
  likeCount: number;
  updatedAt: string;
  createdAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

export async function fetchProducts(
  params: Record<string, string | number> = {}
): Promise<PaginatedResponse<Product>> {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
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

export async function fetchProductDetail(productId: number): Promise<Product> {
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

export async function fetchComments(
  productId: number,
  params: Record<string, string | number> = {}
): Promise<PaginatedResponse<Comment>> {
  try {
    const query = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    const response = await fetch(
      `${BASE_URL}products/${productId}/comments?${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}

export async function fetchArticles(
  params: Record<string, string | number> = {}
): Promise<PaginatedResponse<Article>> {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  try {
    const response = await fetch(`${BASE_URL}articles?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
}

export async function fetchCommentsForArticle(
  articleId: number,
  params: Record<string, string | number> = {}
): Promise<PaginatedResponse<Comment>> {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  try {
    const response = await fetch(
      `${BASE_URL}articles/${articleId}/comments?${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching comments for article:", error);
    throw error;
  }
}

export async function postComment(
  articleId: number,
  content: string
): Promise<Comment> {
  const token = localStorage.getItem("accessToken");
  try {
    const response = await fetch(`${BASE_URL}articles/${articleId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ content }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error posting comment:", error);
    throw error;
  }
}

export const signUp = async (
  email: string,
  nickname: string,
  password: string,
  passwordConfirmation: string
) => {
  const response = await fetch(`${BASE_URL}auth/signUp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, nickname, password, passwordConfirmation }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "회원가입 실패");
  }

  return response.json();
};

export const signIn = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}auth/signIn`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "로그인 실패");
  }

  return response.json();
};

export const refreshAccessToken = async (): Promise<string> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) {
    throw new Error("리프레시 토큰이 없습니다. 다시 로그인해주세요.");
  }

  const response = await fetch(`${BASE_URL}auth/refresh-token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "토큰 갱신 실패");
  }

  const data = await response.json();
  localStorage.setItem("accessToken", data.accessToken);
  return data.accessToken;
};

export const uploadImage = async (image: File): Promise<string> => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  const formData = new FormData();
  formData.append("file", image);

  const response = await fetch(`${BASE_URL}images/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "이미지 업로드 실패");
  }

  const data = await response.json();
  return data.url;
};

export const addArticle = async (
  title: string,
  content: string,
  image?: File | null
): Promise<void> => {
  let token = localStorage.getItem("accessToken");
  if (!token) {
    throw new Error("로그인이 필요합니다.");
  }

  try {
    const body = { title, content };

    const response = await fetch(`${BASE_URL}articles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      if (response.status === 401) {
        const newToken = await refreshAccessToken();
        token = newToken;

        const retryResponse = await fetch(`${BASE_URL}articles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        if (!retryResponse.ok) {
          throw new Error("게시물 등록 실패");
        }
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "게시물 등록 실패");
      }
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "오류 발생");
  }
};
