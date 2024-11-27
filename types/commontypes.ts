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

export interface Comment {
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

export interface GetArticlesCommentResponse {
  nextCursor: number;
  list: Comment[];
}
