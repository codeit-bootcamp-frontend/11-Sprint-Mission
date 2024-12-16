import axios from 'axios';
import { Article, ArticleList } from '@/types/article';
import { BoardForm } from '@/types/boardForm';
import { Comments } from '@/types/comment';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 인터셉터로 401 에러 발생 시 토큰 갱신
instance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      const refreshToken: string | null = localStorage.getItem('refreshToken');

      if (refreshToken) {
        try {
          const response = await instance.post(
            '/auth/refresh-token',
            { refreshToken: refreshToken },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );
          const accessToken = response.data.accessToken;
          localStorage.setItem('accessToken', accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          originalRequest._retry = true;
          return instance(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        }
      }
    }

    return Promise.reject(error);
  }
);

/**
 * 전체 게시글 리스트를 가져옵니다.
 * @returns {Promise<Object>} - 게시글 리스트
 */
async function getArticles(query?: string): Promise<ArticleList> {
  const response = await instance.get(`/articles?${query}`);
  return response.data;
}

/**
 * 게시글을 가져옵니다.
 * @param {number} id - 게시글 ID
 * @returns {Promise<Object>} - 게시글
 */
async function getArticle(id: string): Promise<Article> {
  const response = await instance.get(`/articles/${id}`);
  return response.data;
}

/**
 * 게시글을 작성합니다.
 * @param {Object} boardForm - 게시글 작성 폼
 * @param {string} boardForm.title - 게시글 제목
 * @param {string} boardForm.content - 게시글 내용
 * @param {string} boardForm.image - (선택) 게시글 이미지
 * @returns {Promise<Object>} - 게시글
 */
async function postArticle({
  boardForm,
}: {
  boardForm: BoardForm;
}): Promise<Article> {
  const accessToken = localStorage.getItem('accessToken');
  const response = await instance.post('/articles', boardForm, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
}

/**
 * 댓글을 가져옵니다.
 * @param {number} id - 게시글 ID
 * @returns {Promise<Object>} - 댓글 리스트
 */
async function getComment({
  id,
  query,
}: {
  id: string;
  query: string;
}): Promise<Comments> {
  const response = await instance.get(`/articles/${id}/comments?${query}`);
  return response.data;
}

/**
 * 댓글을 작성합니다.
 * @param {Object} comment - 댓글 작성 폼
 * @param {string} comment.id - 게시글 ID
 * @param {string} comment.content - 댓글 내용
 * @returns {Promise<Object>} - 댓글
 */
async function postComment({
  id,
  content,
}: {
  id: string;
  content: string;
}): Promise<Comment> {
  const accessToken = localStorage.getItem('accessToken');
  const response = await instance.post(
    `/articles/${id}/comments`,
    { content },
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
}

export {
  instance,
  getArticles,
  getArticle,
  postArticle,
  getComment,
  postComment,
};
