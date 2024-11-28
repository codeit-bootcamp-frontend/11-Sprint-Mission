export interface Product {
  id: number;
  name: string;
  images?: string[];
  price?: number | undefined;
  favoriteCount: number;
  updatedAt: string;
}

export interface ProductResponse {
  list: Product[];
  totalCount: number;
}
