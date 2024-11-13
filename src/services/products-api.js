const API_URL = 'https://panda-market-api.vercel.app';

async function fetchApi(endpoint, options = {}) {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('서버에서 오류 응답을 받았습니다.');
    }
    return await response.json();
  } catch (error) {
    throw new Error(error.message || '데이터를 불러오는데 실패했습니다.');
  }
}

export async function getProductsDetail(productId) {
  return await fetchApi(`/products/${productId}`);
}

export async function getProductsDetailComments(productId, limit = 100) {
  return await fetchApi(`/products/${productId}/comments?limit=${limit}`);
}

export async function getProductsList({
  pageSize = 10,
  orderBy = 'recent',
  keyword = '',
  page = 1,
}) {
  const query = new URLSearchParams({ pageSize, orderBy, keyword, page });
  return await fetchApi(`/products?${query}`);
}

export async function addProductsList(productData) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  };
  return await fetchApi('/products', options);
}
