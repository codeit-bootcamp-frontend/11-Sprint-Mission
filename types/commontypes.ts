export interface GetProductsParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
  orderBy?: string;
}

export interface GetProductCommentsParams {
  limit?: number;
  cursor?: string;
}

// 상품 타입 정의
export interface Product {
  id: number;
  name: string;
  price: number;
  description?: string;
  images: string[];
  favoriteCount?: number;
}

export interface AllItemCardProps {
  item: Product;
}

// 상품 목록 응답 타입 정의
export interface GetProductsResponse {
  list: Product[];
  total: number;
  page: number;
  pageSize: number;
  totalCount: number;
}

// 상품 상세 정보 응답 타입 정의
export interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
}

// 댓글 타입 정의
export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    image: string;
    nickname: string;
  };
}

// 댓글 목록 응답 타입 정의
export interface GetCommentsResponse {
  nextCursor: number;
  list: Comment[];
}

export interface GetArticlesParams {
  page?: number;
  pageSize?: number;
  keyword?: string;
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

export interface AddItemFormProps {
  className?: string;
  initialValues?: {
    name: string;
    favorite: number;
    content: string;
    price: string;
    imgFile: File | null;
    tags: string[];
  };
  initialPreview?: string;
  onSubmit: (formData: FormData) => Promise<{ review: any } | null>;
  onSubmitSuccess: (review: any) => void;
}

export interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
}

export interface ItemListResponse {
  totalCount: number;
  list: Item[];
}
