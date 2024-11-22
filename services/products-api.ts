import { fetchApi } from '../utils/fetchApi';

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
