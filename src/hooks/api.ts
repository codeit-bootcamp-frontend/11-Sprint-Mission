const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL as string;

// 상품 데이터 타입
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: any;
  tags: string[];
  ownerNickname: string;
  updatedAt: string;
  favoriteCount: number;
}

// 상품 목록 API 응답 데이터 타입
export interface ProductListResponse {
  totalCount: number;
  list: Product[];
}

// 상품 댓글 데이터 타입
export interface Comment {
  id: number;
  content: string;
  nickname: string;
  createdAt: string;
}

// 상품 댓글 API 응답 데이터 타입
export interface CommentResponse {
  comments: Comment[];
  nextCursor: string | null;
}

//브로드 데이터
export interface Writer {
  nickname: string;
  id: number;
}

export interface Article {
  id: number;
  title: string;
  content: string;
  likeCount: number;
  writer: Writer;
  image: string;
  updatedAt: string;
  createdAt: string;
}

export interface ArticlesResponse {
  totalCount: number;
  list: Article[];
}

// 상품 목록 API
export async function getProducts(
  page: number = 1,
  pageSize: number = 6,
  orderBy: 'recent' | 'favoriteCount' = 'recent'
): Promise<ProductListResponse> {
  const query = `products?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;
  const apiUrl = `${baseUrl}/${query}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('데이터 로드에 실패했습니다.');
    }

    const data: ProductListResponse = await response.json();
    return data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error;
  }
}

// 상품 상세 정보 API
export async function getProductDetail(productId: number): Promise<Product> {
  const apiUrl = `${baseUrl}/products/${productId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      console.error(`Error: ${response.statusText}`);
      throw new Error('상세 정보를 불러오는 데 실패했습니다.');
    }

    const data: Product = await response.json();
    return data;
  } catch (error) {
    console.error('API 호출 중 오류 발생:', error);
    throw error;
  }
}

export interface Comment {
  id: number;
  content: string;
  writer: {
    nickname: string;
  };
}

export interface CommentResponse {
  nextCursor: string | null;
  list: Comment[];
}

// 상품 댓글 API 호출 함수
export async function getComments(
  productId: number,
  limit: number = 100,
  cursor?: string
): Promise<CommentResponse> {
  let url = `${baseUrl}/products/${productId}/comments?limit=${limit}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      console.error(`API Error: ${response.status} - ${response.statusText}`);
      throw new Error('댓글 정보를 불러오는 데 실패했습니다.');
    }

    const data: CommentResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch Error:', error);
    throw error;
  }
}

//자유게시판 게시글 불러오는 api
export async function getBoardsList(
  page: number = 1,
  pageSize: number = 10,
  orderBy: string = 'like'
): Promise<Article[]> {
  const apiUrl = `${baseUrl}/articles?page=${page}&pageSize=${pageSize}&orderBy=${orderBy}`;

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data: ArticlesResponse = await response.json();
    return data.list;
  } catch (error) {
    throw error;
  }
}
