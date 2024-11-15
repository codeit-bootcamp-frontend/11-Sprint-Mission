const baseUrl = process.env.REACT_APP_API_BASE_URL as string;

// 상품 데이터 타입
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: any;
  tags: string[];
  ownerNickname: string;
  updatedAt: string;
  favoriteCount: number;
}

// 상품 목록 API 응답 데이터 타입
export interface ProductListResponse {
  totalCount: number;
  list: Product[];
}

// 상품 댓글 데이터 타입
export interface Comment {
  id: number;
  content: string;
  nickname: string;
  createdAt: string;
}

// 상품 댓글 API 응답 데이터 타입
export interface CommentResponse {
  comments: Comment[];
  nextCursor: string | null;
}

// 상품 목록 API
export async function getProducts(
  page: number = 1,
  pageSize: number = 6,
  orderBy: 'recent' | 'favoriteCount' = 'recent'
): Promise<ProductListResponse> {
  const query = `products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  const apiUrl = `${baseUrl}/${query}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('데이터 로드에 실패했습니다.');
    }

    const data: ProductListResponse = await response.json();
    return data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error;
  }
}

// 상품 상세 정보 API
export async function getProductDetail(productId: number): Promise<Product> {
  const apiUrl = `${baseUrl}/products/${productId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`Error: ${response.statusText}`);
      throw new Error('상세 정보를 불러오는 데 실패했습니다.');
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error;
  }
}

// 상품 댓글 API
export async function getProductDetailComment(
  productId: number,
  limit: number | null = null,
  cursor: string | null = null
): Promise<CommentResponse> {
  let commentApiUrl = `${baseUrl}/products/${productId}/comments`;

  if (limit !== null && cursor !== null) {
    commentApiUrl += `?limit=${limit}&cursor=${cursor}`;
  }

  try {
    const response = await fetch(commentApiUrl);
    if (!response.ok) {
      console.error(`Error: ${response.statusText}`);
      throw new Error('댓글 정보를 불러오는 데 실패했습니다.');
    }

    const data: CommentResponse = await response.json();
    return data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error;
  }
}
