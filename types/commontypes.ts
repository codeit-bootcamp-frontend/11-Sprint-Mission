export interface GetArticlesParams {
  page?: number;
  pageSize?: number;
  keyword?: string | null | undefined;
  orderBy?: string;
}

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

export interface GetArticlesResponse {
  totalCount: string;
  list: Article[];
}
