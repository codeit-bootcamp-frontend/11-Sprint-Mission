import axios from 'axios';
import { BASE_URL, DEFAULT_HEADERS, TOTAL_COUNT } from '@root/constant';
import type { Product, ProductResponse } from '@apptypes/product';

interface FetchProductsParams {
  page?: number;
  pageSize?: number;
  orderBy?: 'recent' | 'favorite';
  keyword?: string;
}

async function fetchProducts(
  params: FetchProductsParams
): Promise<ProductResponse | undefined> {
  try {
    const response = await axios.get<ProductResponse>(`${BASE_URL}/products`, {
      headers: DEFAULT_HEADERS,
      params: params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return undefined;
  }
}

export async function getAllProducts(): Promise<ProductResponse | undefined> {
  return fetchProducts({
    page: 1,
    pageSize: TOTAL_COUNT,
    orderBy: 'recent',
  });
}

export async function getProducts(
  pageNum: number,
  pageLimit: number,
  query = ''
): Promise<ProductResponse | undefined> {
  return fetchProducts({
    page: pageNum,
    pageSize: pageLimit,
    orderBy: 'recent',
    keyword: query,
  });
}

export async function getProductById(id: number): Promise<Product | undefined> {
  try {
    const response = await axios.get<Product>(`${BASE_URL}/products/${id}`, {
      headers: DEFAULT_HEADERS,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching product:', error);
    return undefined;
  }
}
