export interface Product {
  id: number;
  name: string;
  images: string[];
  price: number;
  description: string;
  tags: string[];
  createdAt: Date;
  favoriteCount: number;
  isFavorite: boolean;
}

export interface ProductListResponse {
  totalCount: number;
  list: Product[];
}

export type ProductSortOption = "recent" | "favorite";

export interface ProductListFetch {
  orderBy: ProductSortOption;
  pageSize: number;
  page?: number;
}

export interface ProductComment {
  id: number;
  content: string;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
  updatedAt: Date;
  createdAt: Date;
}

export interface ProductCommentList {
  nextCursor: number;
  list: ProductComment[];
}

export interface Article {
  title: string;
  id: number;
  image: string;
  content: string;
  writer: { nickname: string; id: number };
  updatedAt: Date;
  createdAt: Date;
  likeCount: number;
}

export interface ArticleList {
  totalCount: number;
  list: Article[];
}

export type ArticleSortOption = "recent" | "like";
