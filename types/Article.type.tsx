interface Article {
  updatedAt: string;
  createdAt: string;
  likeCount: number;
  writer: {
    nickname: string;
    id: number;
  };
  image: string;
  content: string;
  title: string;
  id: number;
}

interface ArticleList {
  totalCount: number;
  list: Article[];
}

export type { Article, ArticleList };
