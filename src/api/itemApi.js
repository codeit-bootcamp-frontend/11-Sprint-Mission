/**
 * 제품 목록을 가져오는 비동기 함수
 *
 * @async
 * @function getProducts
 * @param {Object} [params={}] - API 요청에 사용될 쿼리 파라미터
 * @param {number} [params.page] - 요청할 페이지 번호
 * ...
 * @returns {Promise<Object>} 제품 목록과 관련 정보를 포함한 객체
 * @throws {Error} API 요청 실패 시 발생하는 에러
*/

const API_BASE_URL = 'https://panda-market-api.vercel.app';

export async function getProducts(params = {}) {
  const query = new URLSearchParams(params).toString();

  try {
    const response = await fetch(
      `${API_BASE_URL}/products?${query}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body = await response.json();

    return body;
  } 
	catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}