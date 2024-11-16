export type HookReturnType<T> = [boolean, Error | null, (...args: any[]) => Promise<T | undefined>];

export interface ProductType {
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: string;
  name: string;
  id: number;
  isFavorite: boolean;
}

export interface CommentType {
  writer: {
    image: string;
    nickname: string;
    id: number;
  };
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export interface CommentsType {
  nextCursor: number;
  list: CommentType[];
}
