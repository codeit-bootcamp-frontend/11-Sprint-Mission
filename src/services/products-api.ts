const API_URL = 'https://panda-market-api.vercel.app';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  images: string;
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;
}

interface ProductListParams {
  pageSize?: number;
  orderBy?: 'recent' | 'favorite';
  keyword?: string;
  page?: number;
}

async function fetchApi(endpoint: string, options = {}) {
  const url = `${API_URL}${endpoint}`;
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error('서버에서 오류 응답을 받았습니다.');
    }
    return await response.json();
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : '데이터를 불러오는데 실패했습니다.';
    throw new Error(errorMessage);
  }
}

export async function getProductsDetail(productId: string | undefined) {
  return await fetchApi(`/products/${productId}`);
}

export async function getProductsDetailComments(
  productId: string | undefined,
  limit: number = 100,
) {
  return await fetchApi(`/products/${productId}/comments?limit=${limit}`);
}

export async function getProductsList({
  pageSize = 10,
  orderBy = 'recent',
  keyword = '',
  page = 1,
}: ProductListParams) {
  const query = new URLSearchParams({
    pageSize: String(pageSize),
    orderBy,
    keyword,
    page: String(page),
  });
  return await fetchApi(`/products?${query}`);
}

export async function addProductsList(productData: Product) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  };
  return await fetchApi('/products', options);
}
