import {
  ProductListResponse,
  FetchProductsParams,
  ItemDetail,
  UpdateComment,
} from "../types/type";
const BASE_URL = "https://panda-market-api.vercel.app/products";

async function fetchProducts(
  params: FetchProductsParams
): Promise<ProductListResponse> {
  const query = new URLSearchParams(
    Object.entries(params).map(([key, value]) => [key, String(value)])
  ).toString();
  const response = await fetch(`${BASE_URL}?${query}`);

  if (!response.ok) {
    throw new Error(
      `상품 데이터를 불러오는데 실패했습니다. 상태 코드: ${response.status}`
    );
  }

  return response.json();
}

interface GetBestProductsParams {
  pageSize?: number;
  orderBy?: string;
  page?: number;
}

export async function getBestProducts({
  pageSize = 4,
}: GetBestProductsParams = {}): Promise<ProductListResponse> {
  try {
    return await fetchProducts({ page: 1, pageSize, orderBy: "favorite" });
  } catch (error) {
    console.error("베스트 상품 데이터 불러오기 실패:", error);
    throw error;
  }
}
interface GetAllProductsParams {
  page?: number;
  pageSize?: number;
  orderBy?: string;
}
export async function getAllProducts({
  page = 1,
  pageSize = 10,
  orderBy = "recent",
}: GetAllProductsParams = {}): Promise<ProductListResponse> {
  try {
    return await fetchProducts({ page, pageSize, orderBy });
  } catch (error) {
    console.error("전체 상품 데이터 불러오기 실패:", error);
    throw error;
  }
}

export async function getDetailProducts(
  productId: number
): Promise<ItemDetail> {
  const response = await fetch(`${BASE_URL}/${productId}`);
  if (!response.ok) {
    throw new Error("상품 상세 정보를 불러오는데 실패했습니다.");
  }
  return response.json();
}

export async function getDetailComments(
  productId: number,
  limit: number = 10
): Promise<UpdateComment[]> {
  const response = await fetch(
    `${BASE_URL}/${productId}/comments?limit=${limit}`
  );
  if (!response.ok) {
    throw new Error("상품 상세 정보를 불러오는데 실패했습니다.");
  }
  return response.json();
}

export async function getDeleteComment(
  productId: number,
  commentId: number
): Promise<void> {
  const response = await fetch(
    `${BASE_URL}/${productId}/comments/${commentId}`,
    {
      method: "DELETE",
    }
  );
  return response.json();
}

export async function getUpdateComment(
  productId: number,
  commentId: number,
  content: string
): Promise<UpdateComment> {
  const response = await fetch(
    `${BASE_URL}/${productId}/comments/${commentId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    }
  );
  return response.json();
}
