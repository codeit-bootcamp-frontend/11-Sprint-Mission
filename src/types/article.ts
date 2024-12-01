export interface ArticleParams {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
  keyword?: string;
}

export interface Writer {
  nickname: string;
}

export interface Article {
  id: number;
  title: string;
  writer: Writer;
  likeCount: number;
  updatedAt: string;
  image?: string;
}

export interface ArticleResponse {
  totalCount: number;
  list: Article[];
}
