import axios from 'axios';

const BASE_URL: string = 'https://panda-market-api.vercel.app/articles';
const DEFAULT_PAGE_SIZE = 10;

interface GetArticlesProps {
  page?: number;
  pageSize?: number;
  orderBy?: string;
  keyword?: string;
}

export async function getArticles({
  page = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  orderBy = 'recent',
  keyword = '',
}: GetArticlesProps) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        keyword: keyword,
      },
    });
    console.log(response.data.list);
    return response.data.list;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return null;
  }
}
