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

export interface ImageInputProps {
  className?: string;
  name: string;
  value: File | null;
  initialPreview?: string | null;
  onChange: (name: string, file: File | null) => void;
}

export interface FormValues {
  title: string;
  content: string;
  image: File | null;
}
