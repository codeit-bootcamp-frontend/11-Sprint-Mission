const BASE_URL = 'https://panda-market-api.vercel.app/';

interface getProductType {
  page: number;
  pageSize: number;
  orderBy: 'recent' | 'createdAt';
  keyword: string;
}

/**
 * 상품 목록 조회
 * @param {number} page : 페이지네이션에 페이지 번호
 * @param {number} pageSize : 페이지 당 상품 수
 * @param {string} orderBy : 정렬 기준 - recent, favorite
 * @param {string} keyword : 검색어
 * @return {object} : 상품 목록 - totalCount: number, list: array
 */
async function getProducts({
  page = 1,
  pageSize = 10,
  orderBy = 'recent',
  keyword = '',
}: getProductType) {
  const usp = new URLSearchParams();
  const query: getProductType = { page, pageSize, orderBy, keyword };
  Object.entries(query).forEach(([key, value]) => usp.append(key, value.toString()));
  const response = await fetch(`${BASE_URL}products?${usp.toString()}`);

  if (!response.ok) {
    // status 값 출력
    throw new Error('상품 목록 로드에 실패했습니다:', response.status as ErrorOptions);
  }
  return response.json();
}

/**
 * 상품 상세 조회
 * @param {number} id : 상품 Id
 * @return {object} : 상품 상세 내용
 */
async function getProduct(id: number) {
  const response = await fetch(`${BASE_URL}products/${id}`);

  if (!response.ok) {
    throw new Error('상품 상세 로드에 실패했습니다:', response.status as ErrorOptions);
  }
  return response.json();
}

/**
 * 상품 아이디 > 코멘트(문의) 목록 조회
 * @param {number} id : 상품 아이디
 * @param {number} limit : 댓글 갯수
 * @return {object} : 댓글 목록 배열 및 갯수
 */
async function getComments(id: number, limit: number = 50) {
  const response = await fetch(`${BASE_URL}products/${id}/comments?limit=${limit}`);

  if (!response.ok) {
    throw new Error('댓글 목록 로드에 실패했습니다:', response.status as ErrorOptions);
  }
  return response.json();
}

export { getProducts, getProduct, getComments };
