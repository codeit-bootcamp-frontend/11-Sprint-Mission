import axios from 'axios';
import { ArticleList } from '@/types/article';

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

export { getArticles };
