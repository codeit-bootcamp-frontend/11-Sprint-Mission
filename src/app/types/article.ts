export interface ArticleSummary {
  id: number;
  title: string;
  content: string;
  image: string | null;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

export interface ArticleData {
  list: ArticleSummary[];
  totalCount: number;
}
