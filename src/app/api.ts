import axios from 'axios';
import { Article, ArticleList } from '@/types/article';
import {
  SignUp,
  SignIn,
  UserInfo,
  RefreshToken,
  RefreshTokenArg,
} from '@/types/sign';
import { BoardForm } from '@/types/boardForm';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * 전체 게시글 리스트를 가져옵니다.
 * @returns {Promise<Object>} - 게시글 리스트
 */
async function getArticles(query?: string): Promise<ArticleList> {
  const response = await instance.get(`/articles?${query}`);
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

/**
 * 토큰을 갱신합니다.
 * @param {string} refreshToken - 리프레시 토큰
 * @returns {Promise<object>} - 엑세스 토큰 (.accessToken)
 */
async function postRefreshToken(
  refreshToken: RefreshTokenArg
): Promise<RefreshToken> {
  const response = await instance.post('/auth/refresh-Token', refreshToken, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export { getArticles, postArticle, postSignUp, postSignIn, postRefreshToken };
