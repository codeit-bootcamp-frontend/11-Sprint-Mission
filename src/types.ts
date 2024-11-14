export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  keyword?: string | null;
  orderBy?: string;
}

export interface GetProductCommentsParams {
  limit?: number;
  cursor?: string | null;
}

// 상품 타입 정의
export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  images: string[];
  favoriteCount?: number;
}

// 상품 목록 응답 타입 정의
export interface GetProductsResponse {
  list: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalCount: number;
}

// 상품 상세 정보 응답 타입 정의
export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
}

// 댓글 타입 정의
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    image: string;
    nickname: string;
  };
}

// 댓글 목록 응답 타입 정의
export interface GetCommentsResponse {
  nextCursor: number;
  list: Comment[];
}
