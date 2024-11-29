export interface ArticleParams {
  page?: number;
  pageSize?: number;
  orderBy?: "recent" | "like";
  keyword?: string;
}

export interface Writer {
  id: number;
  nickname: string;
}

export interface Article {
  id: number;
  title: string;
  image: string;
  writer: Writer;
  likeCount: number;
  updatedAt: string;
}

export interface ArticleResponse {
  totalCount: number;
  list: Article[];
}
