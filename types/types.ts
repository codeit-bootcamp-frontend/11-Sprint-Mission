export interface CommentType {
  id: string;
  content: string;
  createdAt: string;
  writer: {
    nickname: string;
  };
}

export interface ProductDetailType {
  images: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;
}
