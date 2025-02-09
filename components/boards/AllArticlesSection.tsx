import { useInfiniteQuery } from 'react-query';
import styles from '@styles/AllArticlesSection.module.css';
import { getAllArticles } from '@pages/api/boardApi';
import Link from 'next/link';
import Image from 'next/image';
import Heart from '@public/svgs/ic_heart.svg';
import SearchBar from '@components/SearchBar';
import { useRouter } from 'next/router';
import DropdownMenu from '@components/DropdownMenu';
import { ArticleList, ArticleOrderBy } from '@components/types/articleTypes';
import React, { useRef, useEffect } from 'react';

export default function AllArticlesSection() {
  const router = useRouter();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const keyword = (router.query.q as string) || '';
  const [orderBy, setOrderBy] = React.useState<ArticleOrderBy>('recent');

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, refetch } =
    useInfiniteQuery(
      ['allArticles', { orderBy, keyword }],
      ({ pageParam = 1 }) => getAllArticles(pageParam, orderBy, keyword),
      {
        getNextPageParam: (lastPage, allPages) => {
          return lastPage.list.length > 0 ? allPages.length + 1 : undefined;
        },
        staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      },
    );

  const handleSortSelection = (sortOption: ArticleOrderBy) => {
    setOrderBy(sortOption);
    refetch();
  };

  const handleSearch = (searchKeyword: string) => {
    const query = { ...router.query };
    if (searchKeyword.trim()) {
      query.q = searchKeyword;
    } else {
      delete query.q;
    }
    router.replace({
      pathname: router.pathname,
      query,
    });
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasNextPage && !isFetching) {
          fetchNextPage();
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const currentRef = loadMoreRef.current;

    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <div className={styles['all-section-header']}>
        <div className={styles['all-title']}>게시글</div>
        <Link className={styles['addArticlelink']} href="/addboard">
          글쓰기
        </Link>
      </div>
      <div className={styles['all-section-header']}>
        <SearchBar onSearch={handleSearch} />
        <DropdownMenu
          onSelection={handleSortSelection}
          sortOptions={[
            { key: 'recent', label: '최신순' },
            { key: 'like', label: '인기순' },
          ]}
        />
      </div>
      {!isFetching && data?.pages[0]?.list.length === 0 && (
        <div>데이터가 존재하지 않습니다.</div>
      )}
      {data?.pages.map((page, pageIndex) => (
        <div key={pageIndex} className={styles['allarticle-list']}>
          {page.list.map((article: ArticleList) => (
            <Link
              href={`/board/${article.id}`}
              key={article.id}
              className={styles['allarticle-item']}
            >
              <div className={styles['allarticle-body']}>
                <h2 className={styles['allarticle-title']}>{article.title}</h2>
                <Image
                  width={46}
                  height={46}
                  src={article.image || '/pngs/Img_home_02.png'}
                  alt="게시글 이미지"
                  className={styles['allarticle-image']}
                />
              </div>
              <div className={styles['allarticle-footer']}>
                <div className={styles['allarticle-info']}>
                  <span className={styles['allarticle-writer']}>
                    {article.writer.nickname}
                  </span>
                  <span className={styles['allarticle-updatedAt']}>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <span className={styles['allarticle-likes']}>
                  <Heart />
                  {article.likeCount}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ))}
      {hasNextPage && !isFetching && <div ref={loadMoreRef} className="h-10" />}
      {isFetching && <div>Loading more...</div>}
    </div>
  );
}
