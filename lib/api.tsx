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
