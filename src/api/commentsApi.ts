import axios from 'axios';
import { BASE_URL, DEFAULT_HEADERS } from '@root/constant';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export async function createComment(
  productId: number,
  commentData: string
): Promise<Comment | undefined> {
  try {
    const response = await axios.post<Comment>(
      `${BASE_URL}/products/${productId}/comments`,
      { content: commentData },
      { headers: DEFAULT_HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error('Error creating comment:', error);
  }
}

export async function getCommentsByProductId(
  id: number,
  limit = 1000
): Promise<Comment[] | undefined> {
  const params = {
    limit,
  };

  try {
    const response = await axios.get<{ list: Comment[] }>(
      `${BASE_URL}/products/${id}/comments`,
      {
        headers: DEFAULT_HEADERS,
        params,
      }
    );
    return response.data.list;
  } catch (error) {
    console.error('Error fetching comments:', error);
  }
}

export async function updateCommentById(
  commentId: number,
  updatedData: string
): Promise<Comment | undefined> {
  try {
    const response = await axios.patch<Comment>(
      `${BASE_URL}/comments/${commentId}`,
      { content: updatedData },
      { headers: DEFAULT_HEADERS }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating comment:', error);
  }
}

export async function deleteCommentById(commentId: number): Promise<boolean> {
  try {
    const response = await axios.delete(`${BASE_URL}/comments/${commentId}`, {
      headers: DEFAULT_HEADERS,
    });
    return response.status === 204;
  } catch (error) {
    console.error('Error deleting comment:', error);
    return false;
  }
}
