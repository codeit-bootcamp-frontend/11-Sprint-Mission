export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  writer: {
    nickname: string;
  };
}

export interface ProductDetail {
  images: string;
  name: string;
  price: number;
  description: string;
  tags: string[];
  ownerNickname: string;
  createdAt: string;
  favoriteCount: number;
}
