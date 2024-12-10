import { ProductListFetch } from "@/types/Types";

export async function getProducts({
  orderBy,
  pageSize,
  page = 1,
}: ProductListFetch) {
  const query = `orderBy=${orderBy}&page=${page}&pageSize=${pageSize}`; // pageSize를 쿼리 파라미터에 추가
  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products?${query}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("패치 실패:", error);
    throw error;
  }
}

export async function getDetailComments(productId: number) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/products/${productId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("패치 실패:", error);
    throw error;
  }
}

export async function getProductComments({
  productId,
  limit = 10,
}: {
  productId: number;
  limit?: number;
}) {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  const params = {
    limit: String(limit),
  };

  try {
    // 올바르게 URLSearchParams 생성
    // const query = new URLSearchParams().toString(); // 빈 쿼리 문자열을 생성
    // const query = `limit=${limit}`;
    const query = new URLSearchParams(params).toString();
    const response = await fetch(
      `https://panda-market-api.vercel.app/products/${productId}/comments?${query}`
    ); // api 호출

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body = await response.json();
    return body;
  } catch (error) {
    console.error("패치 실패", error);
    throw error;
  }
}

// Article에 대한 API
export async function getArticleDetail(articleId: number) {
  if (!articleId) {
    throw new Error("Invalid article ID");
  }

  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/articles/${articleId}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("실패:", error);
    throw error;
  }
}

export async function getArticleComments({
  articleId,
  limit = 10,
}: {
  articleId: number;
  limit?: number;
}) {
  if (!articleId) {
    throw new Error("Invalid article ID");
  }

  try {
    const response = await fetch(
      `https://panda-market-api.vercel.app/articles/${articleId}/comments?limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    const body = await response.json();
    return body;
  } catch (error) {
    console.error("실패:", error);
    throw error;
  }
}
