export const API_BASE_URL = "https://panda-market-api.vercel.app";

// 기본 함수
async function fetchApi(url: string, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("서버에서 오류 응답을 받았습니다.");
    }
    return await response.json();
  } catch (error) {
    console.error("에러 발생:", error);
    throw new Error(
      (error as Error).message || "데이터를 불러오는데 실패했습니다."
    );
  }
}

// 상품 가져오기 함수
export async function getProducts({
  page = "",
  pageSize = "",
  orderBy = "",
  keyword = "",
}) {
  const params = new URLSearchParams({ page, pageSize, orderBy, keyword });
  const url = `${API_BASE_URL}/products?${params}`;

  return fetchWithAuth(url);
}

// 상품 id별 가져오기 함수
export async function getProductsById(productId: string | undefined) {
  const url = `${API_BASE_URL}/products/${productId}`;

  return fetchWithAuth(url);
}

// 게시글 id별 가져오기 함수
export async function getArticleById(articleId: string | undefined) {
  const url = `${API_BASE_URL}/articles/${articleId}`;

  return fetchWithAuth(url);
}

// 댓글 가져오기 함수
export async function getCommentsById(
  productId: string | undefined,
  { limit = "" }
) {
  const params = new URLSearchParams({ limit });
  const url = `${API_BASE_URL}/products/${productId}/comments?${params}`;

  return fetchWithAuth(url);
}

interface UpdateCommentParams {
  content: string;
}

// 댓글 수정 함수
export async function updateCommentsById(
  commentId: number,
  { content }: UpdateCommentParams
) {
  const url = `${API_BASE_URL}/comments/${commentId}`;
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  };

  return fetchWithAuth(url, options);
}

// 댓글 삭제 함수
export async function deleteCommentsById(commentId: number) {
  const url = `${API_BASE_URL}/comments/${commentId}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetchWithAuth(url, options);
}

// 물품 삭제 함수
export async function deleteProductById(productId: number) {
  const url = `${API_BASE_URL}/products/${productId}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetchWithAuth(url, options);
}

interface SignupParams {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

// 회원가입 함수
export async function signup(data: SignupParams) {
  const url = `${API_BASE_URL}/auth/signUp`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      nickname: data.nickname,
      password: data.password,
      passwordConfirmation: data.passwordConfirmation,
    }),
  };
  return fetchApi(url, options);
}

interface LoginParams {
  email: string;
  password: string;
}

// 로그인 함수
export async function login(data: LoginParams) {
  const url = `${API_BASE_URL}/auth/signIn`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
    }),
  };
  return fetchApi(url, options);
}

// 토큰을 디코딩하는 함수
const parseJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const decodedPayload = JSON.parse(atob(base64));
    return decodedPayload;
  } catch (error) {
    console.error("JWT 파싱 오류 : ", error);
    return null;
  }
};

// 토큰이 만료되었는지 비교하는 함수
const isTokenExpired = (token: string) => {
  if (!token) return true;

  const decodedToken = parseJwt(token);
  if (!decodedToken) return true;

  const expirationTime = decodedToken.exp * 1000;
  return Date.now() > expirationTime;
};

// 리프레시 토큰을 통해 새로운 엑세스 토큰을 받아오는 함수
const refreshAccessToken = async (refreshToken: string) => {
  const url = `${API_BASE_URL}/auth/refresh-token`;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refreshToken }),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error("리프레시 토큰 요청 실패");
    }

    const data = await response.json();
    const newAccessToken = data.accessToken;
    if (newAccessToken) {
      localStorage.setItem("access_token", newAccessToken);
    }
    return newAccessToken;
  } catch (error) {
    console.error("엑세스 토큰 갱신 오류:", error);
    throw new Error("엑세스 토큰을 갱신할 수 없습니다.");
  }
};

// 로컬 스토리지에서 엑세스 토큰을 가져오고 만료되었으면 리프레시 토큰으로 갱신하는 함수
export const getAccessToken = async () => {
  let accessToken = localStorage.getItem("access_token");
  const refreshToken = localStorage.getItem("refresh_token");

  if (accessToken && !isTokenExpired(accessToken)) {
    return accessToken;
  }

  if (refreshToken) {
    return await refreshAccessToken(refreshToken);
  }
  localStorage.clear();
  window.location.href = "/login";
  return null;
};

// 모든 API 보낼때 토큰 담아서 보내는 함수
async function fetchWithAuth(url: string, options: RequestInit = {}) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    throw new Error("로그인이 필요합니다.");
  }

  const authOptions = {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return fetchApi(url, authOptions);
}

export interface newProductData {
  images?: (string | File)[];
  tags: string[];
  price: number;
  description: string;
  name: string;
}

// 물건 등록하기 - 리액트 쿼리
export async function postProduct(newProduct: newProductData) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(newProduct),
  });

  if (!response.ok) {
    throw new Error("Failed to upload the post.");
  }
  return await response.json();
}

// 물건 수정하기 - 리액트 쿼리
export async function editProduct(
  newProduct: newProductData,
  productId: string
) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(newProduct),
  });

  if (!response.ok) {
    throw new Error("Failed to upload the post.");
  }
  return await response.json();
}

// 댓글 작성하기 - 리액트 쿼리
export async function postComments(
  content: { content: string },
  productId: number
) {
  const accessToken = await getAccessToken();
  const response = await fetch(
    `${API_BASE_URL}/products/${productId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(content),
    }
  );
  if (!response.ok) {
    throw new Error("Failed to upload the comment.");
  }

  return await response.json();
}

//이미지 등록하기기
export async function uploadImage(file: File): Promise<string> {
  try {
    const accessToken = await getAccessToken();
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`${API_BASE_URL}/images/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`이미지 업로드에 실패했어요: ${errorMessage}`);
    }

    const data = await res.json();
    return data.url;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`이미지 업로드에 실패했어요: ${error.message}`);
    } else {
      throw new Error("이미지 업로드에 실패했어요: 알 수 없는 오류");
    }
  }
}
