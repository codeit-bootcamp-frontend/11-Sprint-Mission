import axios from 'axios';

const BASE_URL = 'https://panda-market-api.vercel.app';

const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export async function createComment(productId, commentData) {
  try {
    const response = await axios.post(
      `${BASE_URL}/products/${productId}/comments`,
      { content: commentData },
      { headers: DEFAULT_HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
  }
}

export async function getCommentsByProductId(id, limit = 1000) {
  const params = {
    limit: limit,
  };

  try {
    const response = await axios.get(`${BASE_URL}/products/${id}/comments`, {
      headers: DEFAULT_HEADERS,
      params: params,
    });
    return response.data.list;
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

export async function updateCommentById(commentId, updatedData) {
  try {
    const response = await axios.patch(
      `${BASE_URL}/comments/${commentId}`,
      { content: updatedData },
      { headers: DEFAULT_HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
  }
}

export async function deleteCommentById(commentId) {
  try {
    const response = await axios.delete(`${BASE_URL}/comments/${commentId}`, {
      headers: DEFAULT_HEADERS,
    });
    return response.status === 204;
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
}
