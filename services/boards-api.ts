import { fetchApi } from '../utils/fetchApi';

export async function getBoardList({
  pageSize = 10,
  orderBy = 'recent',
  keyword = '',
}) {
  const query = new URLSearchParams({
    pageSize: String(pageSize),
    orderBy,
    keyword,
  });
  return await fetchApi(`/articles?${query}`);
}
