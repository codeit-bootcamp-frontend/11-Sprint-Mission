import { useEffect, useRef, useState } from 'react';
import styles from '@styles/AllArticlesSection.module.css';
import { getAllArticles } from '@pages/api/boardApi';
import Link from 'next/link';
import Image from 'next/image';
import Heart from '@public/svgs/ic_heart.svg';
import SearchBar from '@components/SearchBar';
import router, { useRouter } from 'next/router';
import DropdownMenu from '@components/DropdownMenu';
import { ArticleList, ArticleOrderBy } from '@components/types/articleTypes';
import React from 'react';

interface AllArticlesSectionProps {
  initialArticles: ArticleList[];
}

export default function AllArticlesSection({
  initialArticles,
}: AllArticlesSectionProps) {
  const [articles, setArticles] = useState<ArticleList[]>(initialArticles);
  const [orderBy, setOrderBy] = useState<ArticleOrderBy>('recent');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialArticles.length > 0);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const keyword = (router.query.q as string) || '';
  const loadMoreRef = useRef(null);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '. ')
      .slice(0, -1); // 공백 제거
  };

  const handleSortSelection = (sortOption: ArticleOrderBy) => {
    setOrderBy(sortOption);
    resetData();
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

  const resetData = () => {
    setArticles([]);
    setPage(1);
    setHasMore(true);
  };

  const fetchAllArticles = async (currentPage: number) => {
    setLoading(true);
    try {
      const data = await getAllArticles(currentPage, orderBy, keyword);
      if (data.list.length > 0) {
        setArticles((prevArticles) => [...prevArticles, ...data.list]);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('데이터를 불러오는데 실패 했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (page === 1 && articles === initialArticles) return; // 중복 호출 방지
    if (page > 1) {
      fetchAllArticles(page);
    }
  }, [page]);

  useEffect(() => {
    if (articles !== initialArticles) {
      resetData();
      fetchAllArticles(1);
    }
  }, [orderBy, keyword]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && hasMore && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      });
    };

    const observerInstance = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );
    const currentRef = loadMoreRef.current;

    if (currentRef) {
      observerInstance.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observerInstance.unobserve(currentRef);
      }
    };
  }, [hasMore, loading]);

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
      {!loading && articles.length === 0 && (
        <div>데이터가 존재하지 않습니다.</div>
      )}
      {articles.length > 0 ? (
        <div className={styles['allarticle-list']}>
          {articles.map((article) => (
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
                    {formatDate(article.createdAt)}
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
      ) : (
        loading && <div>데이터를 불러오는 중...</div>
      )}
      {hasMore && !loading && <div ref={loadMoreRef} className="h-10" />}
    </div>
  );
}
