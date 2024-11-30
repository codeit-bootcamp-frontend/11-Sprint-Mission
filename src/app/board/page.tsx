'use client';

// react, next
import { useState, useRef, FormEvent, useEffect, useCallback } from 'react';
import Link from 'next/link';

// 외부 라이브러리
import { throttle } from 'lodash';

// 함수, 타입
import { getArticles } from '@/api';
import useAsync from '@/hooks/useAsync';
import { Article } from '@/types/article';

// 컴포넌트
import BoardBestItem from '@/components/board/BoardBestItem';
import BoardItemList from '@/components/board/BoardItemList';
import Dropdown from '@/components/Dropdown';
import SearchInput from '@/components/SearchInput';
import Loading from '@/board/loading';
import Error from '@/board/error';

const PAGESIZE = 10;

// 디바이스 크기 별로 베스트 게시글 개수 설정
const getBestArticles = (): number => {
  const width = window.innerWidth;
  if (width >= 1280) {
    return 3;
  } else if (width >= 768) {
    return 2;
  } else {
    return 1;
  }
};

export default function Page() {
  const [resultArticle, setResultArticle] = useState<Article[]>([]);
  const [article, setArticle] = useState<Article[]>([]);
  const [bestArticle, setBestArticle] = useState<Article[]>([]);

  const [pageArray, setPageArray] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState<'recent' | 'like'>('recent');

  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const refreshToken = useRef<string | null>(null);

  const { error, isLoading, wrappedFunction } = useAsync(getArticles);

  const wrappedFunctionRef = useRef(wrappedFunction);

  // 전체 게시글 로드
  const fetchItemList = useCallback(async () => {
    const allArticles = await Promise.all(
      pageArray.map(async (page) => {
        const articleListResult = await wrappedFunctionRef.current(
          `page=${page}&pageSize=${PAGESIZE}&orderBy=${orderBy}`
        );

        return articleListResult?.list || [];
      })
    );
    const flattenArticles = allArticles.flat();
    setArticle(flattenArticles);
    setResultArticle(flattenArticles);
  }, [pageArray, orderBy]);

  // 전체 데이터 로드 및 베스트 게시글 로드
  const fetchData = async () => {
    const [articleResult, bestArticleResult] = await Promise.all([
      wrappedFunction(),
      wrappedFunction(`page=1&pageSize=${getBestArticles()}&orderBy=like`),
    ]);
    setBestArticle(bestArticleResult?.list || []);

    if (articleResult?.totalCount) {
      const pages = Math.ceil(articleResult.totalCount / PAGESIZE);
      const page = Array.from({ length: pages }, (_, i) => i + 1);
      setPageArray(page);
    }
  };

  // 쓰로틀링된 fetchData 함수
  const throttledFetchData = useRef(throttle(fetchData, 500)).current;

  // 검색 결과 가져오기
  const getSearchResult = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    const keyword = (e.target as HTMLFormElement)
      .elements[0] as HTMLInputElement;

    const searchResult = article?.filter((item) =>
      item.title
        .toUpperCase()
        .trim()
        .includes(keyword.value.toUpperCase().trim())
    );
    setSearchKeyword(keyword.value);
    setResultArticle(searchResult);
  };

  // 초기 데이터 로드 및 리사이즈 시 게시글 리로드
  useEffect(() => {
    throttledFetchData();

    window.addEventListener('resize', throttledFetchData);

    return () => {
      window.removeEventListener('resize', throttledFetchData);
    };
  }, [throttledFetchData]);

  // 초기 전체 게시글 목록 로드
  useEffect(() => {
    setTimeout(() => {
      fetchItemList();
    }, 200);
  }, [fetchItemList]);

  // 로컬 스토리지에 저장된 refreshToken로 로그인 상태 검증
  useEffect(() => {
    const localRefreshToken = localStorage.getItem('refreshToken');
    if (localRefreshToken) {
      refreshToken.current = localRefreshToken;
    }
  }, []);

  // isLoading, error 처리
  if (isLoading || (!searchKeyword && !article.length && !error)) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  return (
    <>
      <div className="mt-10 mb-24 container">
        <div>
          <h2 className="h2 mb-6">베스트 게시글</h2>
          <div className="flex justify-between md:gap-4 lg:gap-6">
            {bestArticle?.map((item) => (
              <BoardBestItem key={item.id} item={item} />
            ))}
          </div>
          <div className="mt-12 flex items-center justify-between">
            <h2 className="h2">게시글</h2>
            <Link href={refreshToken ? '/board/addboard' : '/login'}>
              <button className="w-[88px] h-[42px] bg-blue text-white rounded-lg font-medium">
                글쓰기
              </button>
            </Link>
          </div>
          <div className="flex justify-between items-center gap-[6px] mt-6">
            <SearchInput getSearchResult={getSearchResult} />
            <Dropdown orderBy={orderBy} setOrderBy={setOrderBy} />
          </div>
          {resultArticle.length > 0 ? (
            <div className="overflow-y-auto">
              {resultArticle?.map((item) => (
                <BoardItemList key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div>
              <span className="mt-8 flex justify-center">
                검색 결과가 없습니다.
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
