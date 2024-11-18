interface Product {
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: number;
  name: string;
  id: number;
}

interface ProductExtended extends Product {
  isFavorite: boolean;
}

interface ProductList {
  totalCount: number;
  list: Product[];
}

export type { Product, ProductExtended, ProductList };
