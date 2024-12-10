import axios from 'axios';
import { Article, ArticleList } from '@/types/article';
import { SignUp, SignIn, UserInfo } from '@/types/auth';
import { BoardForm } from '@/types/boardForm';
import { Comments } from '@/types/comment';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

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
 * @param {string} accessToken - 엑세스 토큰
 * @returns {Promise<Object>} - 게시글
 */
async function postArticle({
  boardForm,
  accessToken,
}: {
  boardForm: BoardForm;
  accessToken: string;
}): Promise<Article> {
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
 * @param {string} accessToken - 엑세스 토큰
 * @returns {Promise<Object>} - 댓글
 */
async function postComment({
  id,
  content,
  accessToken,
}: {
  id: string;
  content: string;
  accessToken: string;
}): Promise<Comment> {
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

/**
 * 회원가입 요청을 보냅니다.
 * @param {Object} signUpInfo - 회원가입 정보
 * @param {string} signUpInfo.email - 이메일
 * @param {string} signUpInfo.nickname - 닉네임
 * @param {string} signUpInfo.password - 비밀번호
 * @param {string} signUpInfo.passwordConfirmation - 비밀번호 확인
 * @returns {Promise<Object>} - 회원가입 정보
 */
async function postSignUp(signUpInfo: SignUp): Promise<UserInfo> {
  const response = await instance.post('/auth/signUp', signUpInfo, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

/**
 * 로그인 요청을 보냅니다.
 * @param {Object} signInInfo - 로그인 정보
 * @param {string} signInInfo.email - 이메일
 * @param {string} signInInfo.password - 비밀번호
 * @returns {Promise<Object>} - 유저 정보
 */
async function postSignIn(signInInfo: SignIn): Promise<UserInfo> {
  const response = await instance.post('/auth/signIn', signInInfo, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export {
  getArticles,
  getArticle,
  postArticle,
  getComment,
  postComment,
  postSignUp,
  postSignIn,
};
