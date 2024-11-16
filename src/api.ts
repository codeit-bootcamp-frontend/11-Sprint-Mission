// import dotenv from "dotenv";
// dotenv.config();
const BASE_URL = "https://panda-market-api.vercel.app";

interface Product {
  createdAt: string;
  favoriteCount: number;
  ownerNickname: string;
  ownerId: number;
  images: string[];
  tags: string[];
  price: number;
  description: number;
  name: string;
  id: number;
}

interface ProductExtended extends Product {
  isFavorite: boolean;
}

interface ProductList {
  totalCount: number;
  list: Product[];
}

interface Comment {
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

interface CommentList {
  nextCursor: number;
  list: Comment[];
}

/**
 * 상품 목록 조회 API
 * @param {number} page 페이지 번호 (기본 : 1)
 * @param {number} pageSize 페이지당 상품 수 (기본 : 12)
 * @param {string} orderBy recent 최신순(기본) / favorite 좋아요순
 * @param {string} [keyword] 검색 키워드
 * @returns {Promise<ProductList>} 상품 목록 객체
 */
export async function getProducts(
  page: number = 1,
  pageSize: number = 12,
  orderBy: string = "recent",
  keyword: string | undefined = undefined
): Promise<ProductList> {
  if (!BASE_URL) throw new Error("요청을 보낼 수 없습니다.");
  const url = new URL(BASE_URL + "/products");
  url.searchParams.append("page", String(page));
  url.searchParams.append("pageSize", String(pageSize));
  url.searchParams.append("orderBy", orderBy);
  keyword && url.searchParams.append("keyword", keyword);

  const res = await fetch(url.href);
  return res.json();
}

/**
 * 상품 상세 조회 API
 * @param {string} id
 * @returns {object} 상품 상세 정보 객체
 */
export async function getProductById(id: string): Promise<ProductExtended> {
  if (!BASE_URL) throw new Error("요청을 보낼 수 없습니다.");
  const url = new URL(BASE_URL + "/products/" + id);
  const res = await fetch(url.href);
  return res.json();
}

export async function getCommentById(
  type: string,
  id: string,
  limit: number,
  cursor: number
): Promise<CommentList> {
  if (!BASE_URL) throw new Error("요청을 보낼 수 없습니다.");
  const url = new URL(BASE_URL + `/${type}/${id}/comments`);
  url.searchParams.append("limit", String(limit));
  cursor && url.searchParams.append("cursor", String(cursor));
  const res = await fetch(url.href);
  return res.json();
}
