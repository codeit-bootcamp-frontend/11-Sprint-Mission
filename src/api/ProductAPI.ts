// 재사용성을 위한 변수 할당
const API_BASE_URL = 'https://panda-market-api.vercel.app';

export const getProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) {
      throw new Error('서버에서 제품 데이터를 불러오는 데 실패했습니다.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('제품 데이터를 불러올 수 없습니다:', error.message);
    }
  }
};

export async function getBestProducts() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products?page=1&pageSize=4&orderBy=favorite`
    );
    if (!response.ok) {
      throw new Error(
        '서버에서 베스트 제품 데이터를 불러오는 데 실패했습니다.'
      );
    }
    const body = await response.json();
    return body;
  } catch (error) {
    if (error instanceof Error) {
      console.error('베스트 제품 데이터를 불러올 수 없습니다:', error.message);
    }
  }
}

export const getProductDetails = async (productId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${productId}`);

    if (!response.ok) {
      throw new Error('상품 데이터를 불러오는 데 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('상품 상세 데이터를 가져올 수 없습니다:', error.message);
      throw error;
    }
  }
};

export const getComments = async (productId: number) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}/comments?limit=5`
    );
    if (!response.ok) {
      throw new Error('댓글 데이터를 불러오는 데 실패했습니다.');
    }
    const data = await response.json();
    return data.list || [];
  } catch (error) {
    if (error instanceof Error) {
      console.error('댓글 데이터를 가져올 수 없습니다:', error.message);
      return [];
    }
  }
};

export const addComment = async (productId: number, content: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/products/${productId}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      }
    );

    if (!response.ok) {
      throw new Error('댓글 추가에 실패했습니다.');
    }

    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error('댓글 추가 오류:', error.message);
      throw error;
    }
  }
};

export const editComment = async (
  commentId: number,
  updatedContent: string
) => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content: updatedContent }),
    });
    if (!response.ok) {
      throw new Error('댓글 수정에 실패했습니다.');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.error('댓글 수정 오류:', error.message);
      throw error;
    }
  }
};

export const deleteComment = async (commentId: number) => {
  try {
    const response = await fetch(`${API_BASE_URL}/comments/${commentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('댓글 삭제에 실패했습니다.');
    }
    console.log('댓글이 성공적으로 삭제되었습니다.');
  } catch (error) {
    if (error instanceof Error) {
      console.error('댓글 삭제 오류:', error.message);
      throw error;
    }
  }
};
