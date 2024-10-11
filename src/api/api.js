const baseUrl = 'https://panda-market-api.vercel.app/';

export async function getProducts({ page = 1, pageSize = 10, orderBy = 'recent', keyword = '' }) {
  const query = new URLSearchParams({ page, pageSize, orderBy, keyword }).toString();
  const response = await fetch(`${baseUrl}products?${query}`);

  if (!response.ok) {
    throw new Error('데이터 로드에 실패했습니다.');
  }
  return response.json();
}
