export interface Product {
  id: number;
  name: string;
  price: number;
  images: string;
  favoriteCount: number;
}
export interface GetProduct {
  id: string;
  name: string;
  price: number;
  description: string;
  images: string[];
  tags: string[];
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
}

export interface ProductListResponse {
  list: Product[];
  total: number;
  totalCount: number;
}

export interface FetchProductsParams {
  page: number;
  pageSize: number;
  orderBy: string;
}

export interface LoadList {
  page?: number;
  orderBy?: string;
  pageSize: number;
}

export interface ItemDetail {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  tags: string[];
  ownerId: number;
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;
  isFavorite: boolean;
}
export interface UpdateComment {
  nextCursor: number;
  list: Array<{
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    writer: {
      id: number;
      nickname: string;
      image?: string;
    };
  }>;
}
