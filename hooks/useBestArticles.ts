import { useQuery } from 'react-query';
import { getBestArticles } from '@pages/api/boardApi';

export function useBestArticles(pageSize: number | null) {
  return useQuery(
    ['bestArticles', pageSize],
    () => getBestArticles(pageSize || 1),
    {
      enabled: !!pageSize,
      staleTime: 1000 * 60 * 5,
    },
  );
}
