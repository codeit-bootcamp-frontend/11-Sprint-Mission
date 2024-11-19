export interface Article {
  id: number;
  title: string;
  content: string;
  image: string;
  writer: {
    id: number;
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
  likeCount: number;
}
