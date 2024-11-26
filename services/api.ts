import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

interface ProductListParams {
  pageSize?: number;
  orderBy?: 'recent' | 'favorite';
  keyword?: string;
  page?: number;
}
interface BoardListParams {
  pageSize?: number;
  orderBy?: 'recent' | 'like';
  keyword?: string;
  page?: number;
}

// Axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 상품 상세 정보 조회 API
 */
export async function getProductsDetail(productId: string | undefined) {
  try {
    const response = await apiClient.get(`/products/${productId}`);
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? error.response.data.message
        : '상품 상세 정보를 불러오는데 실패했습니다.';
    throw new Error(errorMessage);
  }
}

/**
 * 상품 상세 정보의 댓글 목록 조회 API
 */
export async function getProductsDetailComments(
  productId: string | undefined,
  limit: number = 100
) {
  try {
    const response = await apiClient.get(`/products/${productId}/comments`, {
      params: { limit },
    });
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? error.response.data.message
        : '상품 댓글 목록을 불러오는데 실패했습니다.';
    throw new Error(errorMessage);
  }
}

/**
 * 상품 목록 조회 API
 */
export async function getProductsList({
  pageSize = 10,
  orderBy = 'recent',
  keyword = '',
  page = 1,
}: ProductListParams) {
  try {
    const response = await apiClient.get('/products', {
      params: {
        pageSize,
        orderBy,
        keyword,
        page,
      },
    });
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? error.response.data.message
        : '상품 목록을 불러오는데 실패했습니다.';
    throw new Error(errorMessage);
  }
}

/**
 * 게시판 목록 조회 API
 */
export async function getBoardList({
  pageSize = 10,
  orderBy = 'recent',
  keyword = '',
  page = 1,
}: BoardListParams) {
  try {
    const response = await apiClient.get('/articles', {
      params: {
        pageSize,
        orderBy,
        keyword,
        page,
      },
    });
    return response.data;
  } catch (error: unknown) {
    const errorMessage =
      axios.isAxiosError(error) && error.response
        ? error.response.data.message
        : '게시판 목록을 불러오는데 실패했습니다.';
    throw new Error(errorMessage);
  }
}
