// 재사용성을 위한 변수 할당
const API_BASE_URL = 'https://panda-market-api.vercel.app';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('서버에서 제품 데이터를 불러오는 데 실패했습니다.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('제품 데이터를 불러올 수 없습니다:', error.message);
  }
};

export async function getBestProducts() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products?page=1&pageSize=4&orderBy=favorite`
    );
    if (!response.ok) {
      throw new Error(
        '서버에서 베스트 제품 데이터를 불러오는 데 실패했습니다.'
      );
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error('베스트 제품 데이터를 불러올 수 없습니다:', error.message);
  }
}
