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
