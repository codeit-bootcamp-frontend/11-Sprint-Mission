import { AxiosResponse } from 'axios';
import axiosInstance from './axios';

export type OrderType = 'recent' | 'favorite';

export interface Product {
  page: number;
  pageSize: number;
  orderBy: OrderType;
  keyword?: string;
}

export interface ProductResult {
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
}

interface ProductResultResponse {
  totalCount: number; // 전체 상품 수
  list: ProductResult[]; // 상품 목록
}

// 상품목록가져오기
export const getProducts = (
  params = {},
): Promise<AxiosResponse<ProductResultResponse>> => {
  return axiosInstance.get('/products', {
    params: {
      page: 1,
      pageSize: 10,
      orderBy: 'recent',
      ...params,
    },
  });
};

export const getProductById = (productId: string) => {
  return axiosInstance.get(`/products/${productId}`);
};

export const createProduct = (productData: Product) => {
  return axiosInstance.post('/products', productData);
};

export const updateProduct = (
  productId: string,
  productData: Partial<Product>,
) => {
  return axiosInstance.put(`/products/${productId}`, productData);
};

export const deleteProduct = (productId: string) => {
  return axiosInstance.delete(`/products/${productId}`);
};
