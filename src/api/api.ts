export const API_BASE_URL = "https://panda-market-api.vercel.app";

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

export async function getProducts({
  page = "",
  pageSize = "",
  orderBy = "",
  keyword = "",
}) {
  const params = new URLSearchParams({ page, pageSize, orderBy, keyword });
  const url = `${API_BASE_URL}/products?${params}`;

  return fetchApi(url);
}

export async function getProductsById(productId: string | undefined) {
  const url = `${API_BASE_URL}/products/${productId}`;

  return fetchApi(url);
}

export async function getCommentsById(
  productId: string | undefined,
  { limit = "" }
) {
  const params = new URLSearchParams({ limit });
  const url = `${API_BASE_URL}/products/${productId}/comments?${params}`;

  return fetchApi(url);
}

interface UpdateCommentParams {
  content: string;
}

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

  return fetchApi(url, options);
}

interface SignupParams {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}

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
