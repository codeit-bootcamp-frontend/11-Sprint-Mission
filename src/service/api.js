const apiUrl = 'https://panda-market-api.vercel.app/products?';

/**
 * 상품 목록을 로드하는 비동기 함수.
 * @param {string} orderBy - 정렬 기준 ('recent' 또는 'favorite').
 * @param {string} keyword - 검색 키워드.
 * @param {number} page - 현재 페이지 번호.
 * @param {number} pageSize - 페이지당 아이템 수.
 */

async function getItems(
  orderBy = 'recent',
  keyword = '',
  page = 1,
  pageSize = 10
) {
  const query = `orderBy=${orderBy}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`;

  try {
    const response = await fetch(`${apiUrl}${query}`);
    if (!response.ok) {
      throw new Error('데이터를 불러오는데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('패칭 중 오류가 발생했습니다', error);
    throw new Error('상품을 불러오는데 실패했습니다.');
  }
}

async function createItems(formData) {
  try {
    const response = await fetch(`${apiUrl}/`, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error('데이터를 생성하는데 실패했습니다.');
    }
    return await response.json();
  } catch (error) {
    console.error('패칭 중 오류가 발생했습니다.', error);
    throw new Error('상품을 등록하는데 실패했습니다.');
  }
}

export { getItems, createItems };
