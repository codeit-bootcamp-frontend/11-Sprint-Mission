import { CommentList } from "./types/Comment";
import { ProductExtended, ProductList } from "./types/Product";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export async function getProductList(
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

export async function getProductById(id: string): Promise<ProductExtended> {
  if (!BASE_URL) throw new Error("요청을 보낼 수 없습니다.");
  const url = new URL(BASE_URL + "/products/" + id);
  const res = await fetch(url.href);
  return res.json();
}

export async function getCommentListByProductId(
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
