export interface BestItemData {
  id: number;
  title: string;
  likeCount: number;
  createdAt: string;
  image: string;
  writer: {
    id: number;
    nickname: string;
  };
}

export interface Article {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  writer: { nickname: string };
  image: string;
  createdAt: string;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}
