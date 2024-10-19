const BASE_URL = 'https://panda-market-api.vercel.app/';

/**
 * 상품 목록 조회
 * @param {number} page : 페이지네이션에 페이지 번호
 * @param {number} pageSize : 페이지 당 상품 수
 * @param {string} orderBy : 정렬 기준 - recent, favorite
 * @param {string} keyword : 검색어
 * @return {object} : 상품 목록 - totalCount: number, list: array
 */
async function getProducts({ page = 1, pageSize = 10, orderBy = 'recent', keyword = '' }) {
  const query = new URLSearchParams({ page, pageSize, orderBy, keyword }).toString();
  const response = await fetch(`${BASE_URL}products?${query}`);

  if (!response.ok) {
    // status 값 출력
    throw new Error('상품 목록 로드에 실패했습니다:', response.status);
  }
  return response.json();
}

/**
 * 상품 상세 조회
 * @param {number} id : 상품 Id
 * @return {object} : 상품 상세 내용
 */
async function getProduct(id) {
  const response = await fetch(`${BASE_URL}products/${id}`);

  if (!response.ok) {
    throw new Error('상품 상세 로드에 실패했습니다:', response.status);
  }
  return response.json();
}

async function getComments(id, limit = 50) {
  const response = await fetch(`${BASE_URL}products/${id}/comments?limit=${limit}`);

  if (!response.ok) {
    throw new Error('댓글 목록 로드에 실패했습니다:', response.status);
  }
  return response.json();
}

export { getProducts, getProduct, getComments };
