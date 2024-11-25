import axios from 'axios';
import { ArticleList } from '@/types/article.type';

const instance = axios.create({
  baseURL: 'https://panda-market-api.vercel.app',
});

/**
 * 게시글 정렬 타입
 * @type {string} OrderByType
 */
type OrderByType = 'recent' | 'like';

interface getArticleListProps {
  page?: number;
  pageSize?: number;
  orderBy?: OrderByType;
  keyword?: string;
}

const getArticleList = async ({
  page = 1,
  pageSize = 10,
  orderBy = 'recent',
  keyword = '',
}: getArticleListProps = {}): Promise<ArticleList> => {
  const res = await instance.get('/articles', {
    params: { page, pageSize, orderBy, keyword },
  });

  return res.data;
};

export { getArticleList };
export type { OrderByType, getArticleListProps };
export default instance;
