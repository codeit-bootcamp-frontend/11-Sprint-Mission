const baseUrl = process.env.REACT_APP_API_BASE_URL;

export async function getProducts(
  page = 1,
  pageSize = 300,
  orderBy = 'recent',
  keyword = ''
) {
  const query = `products?orderBy=${orderBy}&keyword=${keyword}&page=${page}&pageSize=${pageSize}`;
  const apiUrl = `${baseUrl}/${query}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error('데이터 로드에 실패했습니다.');
  }

  const data = await response.json();
  return data;
}

export async function getProductDetail(productId) {
  const apiUrl = `${baseUrl}/products/${productId}`;

  console.log('API 요청 URL:', apiUrl);

  const response = await fetch(apiUrl);
  if (!response.ok) {
    console.error(`Error: ${response.statusText}`);
    throw new Error('상세 정보를 불러오는 데 실패했스빈다.');
  }

  const data = await response.json();
  return data;
}
