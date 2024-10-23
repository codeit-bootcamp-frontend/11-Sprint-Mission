import instance from "./axiosInstance";

/**
 * 상품 목록을 가져옵니다.
 * @param {Object} params - 상품 목록을 필터링할 파라미터 객체
 * @param {number} [params.page=1] - 요청할 페이지 번호
 * @param {number} [params.pageSize=10] - 한 페이지에 표시할 상품 개수
 * @param {string|null} [params.keyword=null] - 검색 키워드
 * @returns {Promise<Object>} 상품 목록 데이터를 반환합니다.
 * @throws {Error} 정보 불러오기 실패 시 에러를 발생시킵니다.
 */
export async function getProducts(params = {}) {
  try {
    const response = await instance.get("/products", {
      params,
    });
    return response.data;
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
export async function getProductDetail(productId) {
  try {
    const response = await instance.get(`/products/${productId}`);
    return response.data;
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
export async function getProductComments(productId, limit = 10, cursor = null) {
  try {
    const params = { limit };

    if (cursor) {
      params.cursor = cursor;
    }

    const response = await instance.get(`/products/${productId}/comments`, {
      params,
    });

    return response.data;
  } catch (error) {
    throw new Error("댓글 정보를 불러오는데 실패했습니다.");
  }
}
