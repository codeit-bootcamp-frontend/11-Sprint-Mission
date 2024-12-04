import axiosInstance from "@/lib/axiosInstance";
import {
  GetProductCommentsParams,
  GetProductsParams,
  GetProductsResponse,
  ProductDetail,
  GetCommentsResponse,
  GetArticlesResponse,
  GetArticlesParams,
  Article,
  GetArticlesCommentResponse,
  Product,
} from "@/types/commontypes";

export async function getProducts(
  params: GetProductsParams = {}
): Promise<GetProductsResponse> {
  try {
    const { data } = await axiosInstance.get<GetProductsResponse>("/products", {
      params,
    });
    return data;
  } catch (error) {
    throw new Error("정보를 불러오는데 실패했습니다.");
  }
}

/**
 * 특정 상품의 상세 정보를 가져옵니다.
 * @param {string} productId - 상품의 ID
 * @returns {Promise<Object>} 상품 상세 정보를 반환합니다.
 * @throws {Error} 상품 상세 정보 불러오기 실패 시 에러를 발생시킵니다.
 */
export async function getProductDetail(
  productId: string
): Promise<ProductDetail> {
  try {
    const { data } = await axiosInstance.get<ProductDetail>(
      `/products/${productId}`
    );
    return data;
  } catch (error) {
    throw new Error("상품 상세 정보를 불러오는데 실패했습니다.");
  }
}

/**
 * 특정 상품의 댓글 목록을 가져옵니다.
 * @param {string} productId - 상품의 ID
 * @param {number} [limit=10] - 가져올 댓글의 개수 (기본값: 10)
 * @param {string|null} [cursor=null] - 페이지네이션을 위한 커서 (기본값: null)
 * @returns {Promise<Object>} 댓글 데이터를 반환합니다.
 * @throws {Error} 댓글 정보 불러오기 실패 시 에러를 발생시킵니다.
 */
export async function getProductComments(
  productId: string,
  limit: number = 9999,
  cursor: string | null = null
): Promise<GetCommentsResponse> {
  try {
    const params: GetProductCommentsParams = { limit };

    if (cursor) {
      params.cursor = cursor;
    }

    const { data } = await axiosInstance.get<GetCommentsResponse>(
      `/products/${productId}/comments`,
      {
        params,
      }
    );
    return data;
  } catch (error) {
    throw new Error("댓글 정보를 불러오는데 실패했습니다.");
  }
}

export async function getArticles(
  params: GetArticlesParams = {}
): Promise<GetArticlesResponse> {
  try {
    const { orderBy = "recent", pageSize, page, keyword } = params;

    const { data } = await axiosInstance.get<GetArticlesResponse>("/articles", {
      params: { orderBy, pageSize, page, keyword },
    });

    return data;
  } catch (error) {
    throw new Error("게시물을 불러오는데 실패했습니다.");
  }
}

export async function getArticleById(id: number): Promise<Article> {
  const response = await axiosInstance.get(`/articles/${id}`);
  return response.data;
}

export async function getArticleComment(
  id: number,
  cursor: number | null = null,
  limit: number = 1000
): Promise<GetArticlesCommentResponse> {
  try {
    const { data } = await axiosInstance.get<GetArticlesCommentResponse>(
      `/articles/${id}/comments`,
      {
        params: { cursor, limit },
      }
    );
    return data;
  } catch (error) {
    throw new Error("댓글 데이터를 불러오는 데 실패했습니다.");
  }
}

/**
 * 회원가입 요청을 보냅니다.
 * @param {Object} params - 회원가입 요청에 필요한 데이터
 * @param {string} params.email - 이메일
 * @param {string} params.nickname - 닉네임
 * @param {string} params.password - 비밀번호
 * @param {string} params.passwordConfirmation - 비밀번호 확인
 * @returns {Promise<Object>} 회원가입 성공 시 서버의 응답 데이터를 반환합니다.
 * @throws {Error} 회원가입 실패 시 에러를 발생시킵니다.
 */
export async function signUp(params: {
  email: string;
  nickname: string;
  password: string;
  passwordConfirmation: string;
}): Promise<{ accessToken: string }> {
  try {
    const { data } = await axiosInstance.post("/auth/signUp", params);
    return data; // 서버 응답에서 accessToken 반환
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "회원가입에 실패했습니다."
      );
    }
    throw new Error("회원가입 요청 중 문제가 발생했습니다.");
  }
}

/**
 * 로그인 요청을 보냅니다.
 * @param {Object} params - 로그인 요청에 필요한 데이터
 * @param {string} params.email - 이메일
 * @param {string} params.password - 비밀번호
 * @returns {Promise<Object>} 로그인 성공 시 서버의 응답 데이터를 반환합니다.
 * @throws {Error} 로그인 실패 시 에러를 발생시킵니다.
 */
export async function signIn(params: {
  email: string;
  password: string;
}): Promise<{ accessToken: string }> {
  try {
    // 로그인 API 요청
    const { data } = await axiosInstance.post("/auth/signIn", params);

    // accessToken 반환
    return data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "로그인에 실패했습니다.");
    }
    throw new Error("로그인 요청 중 문제가 발생했습니다.");
  }
}

/**
 * 상품 등록 요청을 보냅니다.
 * @param {Object} itemData - 상품 등록에 필요한 데이터 (JSON 형식)
 * @returns {Promise<Product>} 등록된 상품 데이터를 반환합니다.
 * @throws {Error} 상품 등록 실패 시 에러를 발생시킵니다.
 */
export async function addItem(itemData: {
  name: string;
  description: string;
  price: number;
  images: string[]; // 서버에서 파일 경로나 이름을 요구한다고 가정
  tags: string[];
}): Promise<Product> {
  try {
    const { data } = await axiosInstance.post<Product>("/products", itemData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        error.response.data.message || "상품 등록에 실패했습니다."
      );
    }
    throw new Error("상품 등록 요청 중 문제가 발생했습니다.");
  }
}
