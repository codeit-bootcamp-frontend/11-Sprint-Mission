const baseUrl = 'https://panda-market-api.vercel.app/';

export async function getProducts(options) {
  const { page = 1, pageSize = 10, orderBy = 'recent', keyword = '' } = options;
  const query = `products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}&keyword=${keyword}`;
  const response = await fetch(baseUrl + query);

  if (!response.ok) {
    throw new Error('데이터 로드에 실패했습니다.');
  }
  return await response.json();
}
