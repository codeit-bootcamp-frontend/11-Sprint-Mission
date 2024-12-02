import axios from 'axios';
import { Articles } from '@/types/article.type';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

/**
 * 게시글 정렬 타입
 * @type {string} OrderByType
 */
type OrderByType = 'recent' | 'like';

interface getArticlesParams {
  page?: number;
  pageSize?: number;
  orderBy?: OrderByType;
  keyword?: string;
}

const getArticles = async ({
  page = 1,
  pageSize = 10,
  orderBy = 'recent',
  keyword = '',
}: getArticlesParams = {}): Promise<Articles | null> => {
  try {
    const res = await instance.get('/articles', {
      params: { page, pageSize, orderBy, keyword },
    });

    return res.data;
  } catch (error) {
    console.error(error);
    return null;
    // throw error;
  }
};

export { getArticles };
export type { OrderByType, getArticlesParams };
export default instance;
