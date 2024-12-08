import { useCallback, useEffect, useState } from 'react';

import { getArticles } from '@api/ArticleApi';
import { sort } from '@/types';
import {
  ARTICLES_PER_MOBILE_PAGE,
  ARTICLES_PER_DESCKTOP_PAGE,
  BEST_ARTICLE_SIZE,
} from '@/constants';
import { useMediaQuery } from '@/hooks/useMediaQuery';

import BestArticleContainer from './BestArticleContainer';
import Header from './Header';
import ArticleContainer from './ArticleContainer';
import SearchBar from './SearchBar';

export default function BoardsPage() {
  const isMobile = useMediaQuery('(max-width: 640px)');
  const [bestArticles, setBestArticles] = useState([]);
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<sort>('recent');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hasMore, setHasMore] = useState(true);

  const fetchBestArticles = useCallback(async () => {
    const response = await getArticles({
      pageSize: BEST_ARTICLE_SIZE,
      orderBy: 'like',
    });
    setBestArticles(response);
  }, []);

  const fetchArticles = useCallback(async () => {
    const pageSize = isMobile
      ? ARTICLES_PER_MOBILE_PAGE
      : ARTICLES_PER_DESCKTOP_PAGE;

    if (searchQuery === '') {
      const response = await getArticles({
        pageSize,
        orderBy: sort,
      });
      setArticles(response);
      return;
    }

    const response = await getArticles({
      page,
      pageSize,
      orderBy: sort,
      keyword: searchQuery,
    });

    setArticles(response);
  }, [page, sort, searchQuery, isMobile]);

  useEffect(() => {
    fetchBestArticles();
    fetchArticles();
  }, [fetchBestArticles, fetchArticles]);

  return (
    <>
      <Header
        option={[
          { label: '자유게시판', href: '/board', color: 'text-blue-500' },
          { label: '중고마켓', href: '/items' },
        ]}
      />

      <main className='px-4 lg:max-w-fit sm:px-6 space-y-4 sm:space-y-6 lg:mx-auto'>
        <BestArticleContainer bestArticles={bestArticles} />
        <ArticleContainer articles={articles}>
          <SearchBar
            setSearchQuery={setSearchQuery}
            sort={sort}
            setSort={setSort}
          />
        </ArticleContainer>
      </main>
    </>
  );
}
