const BASE_URL = "https://panda-market-api.vercel.app/";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  images?: string[];
  tags?: string[];
  favoriteCount?: number;
}

export interface Comment {
  id: number;
  content: string;
  writer: {
    nickname: string;
    image: string | null;
  };
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  list: T[];
  total: number;
  page: number;
  limit: number;
}

export async function fetchProducts(
  params: Record<string, string | number> = {}
): Promise<PaginatedResponse<Product>> {
  const query = new URLSearchParams(
    params as Record<string, string>
  ).toString();
  try {
    const response = await fetch(`${BASE_URL}products?${query}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error fetching products: ", error);
    throw error;
  }
}

export async function fetchProductDetail(productId: number): Promise<Product> {
  try {
    const response = await fetch(`${BASE_URL}products/${productId}`);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("Error fetching product details: ", error);
    throw error;
  }
}

export async function fetchComments(
  productId: number,
  params: Record<string, string | number> = {}
): Promise<PaginatedResponse<Comment>> {
  try {
    const query = new URLSearchParams(
      params as Record<string, string>
    ).toString();
    const response = await fetch(
      `${BASE_URL}products/${productId}/comments?${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }
}
