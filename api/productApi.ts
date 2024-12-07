import axios, { AxiosResponse } from 'axios';
import axiosInstance from './axios';
import { Product } from '@/components/Card';
import { Comment } from '@/components/Comment';

export type OrderType = 'recent' | 'favorite';

interface ProductResultResponse {
  totalCount: number; // 전체 상품 수
  list: Product[]; // 상품 목록
}

export interface GetProduct {
  page: number;
  pageSize: number;
  orderBy: string;
  keyword?: string;
}

export interface CreateProductProps {
  name: string;
  description: string;
  images: string[];
  tags: string[];
  price: number;
}
// -- Product API

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

export const getProductById = async (productId: number) => {
  try {
    return await axiosInstance.get(`/products/${productId}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios Error:', error.response?.data || error.message);
      throw new Error('데이터를 불러오는도중 에러가 발생했습니다.');
    } else {
      console.error('Unknown Error:', error);
      throw new Error('기타 에러입니다.');
    }
  }
};

export const createProduct = (
  productData: CreateProductProps,
): Promise<AxiosResponse> => {
  return axiosInstance.post('/products', productData, {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
    },
  });
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
