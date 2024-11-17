export async function getProducts(order = "resent") {
  const query = `order=${order}`;
  // const response = await fetch(
  //   `https://panda-market-api.vercel.app/products?${query}`
  // );
  // const body = await response.json();
  // return body;
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
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

// const API_BASE_URL = "https://panda-market-api.vercel.app";

// 상품상세정보
// export const getDetail = async (productId) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/products/${productId}`);
//     if (!response.ok) {
//       throw new Error("오류 응답");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("실패", error);
//     throw error;
//   }
// };
export async function getDetailComments(productId) {
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
    console.error("Failed to fetch product detail:", error);
    throw error;
  }
}

// 댓글
// export const getDetailComment = async (productId) => {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/products/${productId}/comments`
//     );
//     if (!response.ok) {
//       throw new Error("오류응답");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("실패", error);
//     throw error;
//   }
// };

// export const postComment = async (productId, comment) => {
//   try {
//     const response = await fetch(
//       `${API_BASE_URL}/product/${productId}/comments`,
//       { text: comment }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("실패", error);
//     throw error;
//   }
// };

type Comment = {
  id: string;
  content: string;
  writer: {
    id: string;
    nickname: string;
    image?: string; // Optional: 일부 사용자에게 이미지가 없을 수도 있음
  };
  createdAt: string; // 문자열 형식의 날짜
  updatedAt: string; // 문자열 형식의 날짜
};

type GetProductCommentsResponse = Comment[];

export async function getProductComments(
  productId: string
): Promise<GetProductCommentsResponse> {
  if (!productId) {
    throw new Error("Invalid product ID");
  }

  try {
    // 올바르게 URLSearchParams 생성
    const query = new URLSearchParams().toString(); // 빈 쿼리 문자열을 생성
    const response = await fetch(
      `https://panda-market-api.vercel.app/products/${productId}/comments?${query}`
    ); // api 호출

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const body: GetProductCommentsResponse = await response.json();
    return body;
  } catch (error) {
    console.error("패치 실패", error);
    throw error;
  }
}

// export async function getProductComments({ productId }) {
//   if (!productId) {
//     throw new Error("Invalid product ID");
//   }

//   try {
//     const query = new URLSearchParams.toString();
//     const response = await fetch(
//       `https://panda-market-api.vercel.app/products/${productId}/comments?${query}`
//     );
//     if (!response.ok) {
//       throw new Error(`HTTP error: ${response.status}`);
//     }
//     const body = await response.json();
//     return body;
//   } catch (error) {
//     console.error("실패:", error);
//     throw error;
//   }
// }
