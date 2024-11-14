import instance from "./axiosInstance";
import {
  GetProductCommentsParams,
  GetProductsParams,
  GetProductsResponse,
  ProductDetail,
  GetCommentsResponse,
} from "./types";

/**
 * 상품 목록을 가져옵니다.
 * @param {Object} params - 상품 목록을 필터링할 파라미터 객체
 * @param {number} [params.page=1] - 요청할 페이지 번호
 * @param {number} [params.pageSize=10] - 한 페이지에 표시할 상품 개수
 * @param {string|null} [params.keyword=null] - 검색 키워드
 * @returns {Promise<Object>} 상품 목록 데이터를 반환합니다.
 * @throws {Error} 정보 불러오기 실패 시 에러를 발생시킵니다.
 */
export async function getProducts(
  params: GetProductsParams = {}
): Promise<GetProductsResponse> {
  try {
    const { data } = await instance.get<GetProductsResponse>("/products", {
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
    const { data } = await instance.get<ProductDetail>(
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
  limit: number = 10,
  cursor: string | null = null
): Promise<GetCommentsResponse> {
  try {
    const params: GetProductCommentsParams = { limit };

    if (cursor) {
      params.cursor = cursor;
    }

    const { data } = await instance.get<GetCommentsResponse>(
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
