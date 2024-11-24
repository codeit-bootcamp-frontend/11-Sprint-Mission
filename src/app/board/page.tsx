'use client';

import { FormEvent, useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { format } from 'date-fns';
import { throttle } from 'lodash';

import { getArticles } from '@/api';
import useAsync from '@/hooks/useAsync';
import { ArticleSummary } from '@/types/article';

const PAGESIZE = 10;

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
  const [resultArticle, setResultArticle] = useState<ArticleSummary[] | []>([]);
  const [article, setArticle] = useState<ArticleSummary[] | []>([]);
  const [bestArticle, setBestArticle] = useState<ArticleSummary[] | []>([]);

  const dropDownRef = useRef<HTMLDivElement | null>(null);
  const [pageArray, setPageArray] = useState<number[]>([]);
  const [orderBy, setOrderBy] = useState<string>('recent');
  const [dropDownView, setDropDownView] = useState<boolean>(false);

  const { error, isLoading, wrappedFunction } = useAsync(getArticles);

  // 전체 게시글 로드
  const fetchItemList = useCallback(async () => {
    const allArticles = await Promise.all(
      pageArray.map(async (page) => {
        const articleListResult = await wrappedFunction(
          `page=${page}&pageSize=${PAGESIZE}&orderBy=${orderBy}`
        );

        return articleListResult?.list || [];
      })
    );
    const flattenArticles = allArticles.flat();
    setArticle(flattenArticles);
    setResultArticle(flattenArticles);
  }, [orderBy, pageArray, wrappedFunction]);

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

      fetchItemList();
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
    setResultArticle(searchResult);
  };

  // 드롭다운 메뉴 토글
  const handleDropdownView = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setDropDownView((prevState) => !prevState);
  };

  // 드롭다운 메뉴에서 선택한 값에 따라 정렬 조건 변경
  const handleClickLabel = (order: string) => {
    setOrderBy(order);
    setDropDownView(false);
  };

  // 초기 데이터 로드 및 리사이즈 시 게시글 리로드
  useEffect(() => {
    throttledFetchData();

    window.addEventListener('resize', throttledFetchData);

    return () => {
      window.removeEventListener('resize', throttledFetchData);
    };
  }, [throttledFetchData]);

  // 드롭메뉴 눌렀을 때 게시글 목록만 리로드
  useEffect(() => {
    fetchItemList();
  }, [pageArray, orderBy, fetchItemList]);

  // 바깥 클릭 시 드롭다운 메뉴 닫기
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropDownRef.current &&
        !dropDownRef.current.contains(e.target as HTMLElement)
      ) {
        setDropDownView(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <>
      <div className="mt-10 mb-24 container">
        {!error && (
          <div>
            <h2 className="h2 mb-6">베스트 게시글</h2>
            <div className="flex justify-between md:gap-4 lg:gap-6">
              {bestArticle?.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-50 border w-full h-[180px] rounded-xl pl-6 pr-6"
                >
                  <div className="w-[102px] h-[30px] rounded-b-2xl bg-blue text-white font-semiBold flex items-center justify-center mb-4">
                    <div className="relative w-4 h-4 mr-1">
                      <Image
                        fill
                        src="/images/medal.png"
                        alt="베스트"
                        sizes="(max-width: 640px) 1rem, 1rem"
                      />
                    </div>
                    Best
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </span>
                      <div className="relative bg-white border border-gray-200 w-[72px] h-[72px] rounded-lg overflow-hidden">
                        <Image
                          fill
                          unoptimized
                          src={item.image ? item.image : '/images/noImage.jfif'}
                          alt={item.title}
                          className="object-cover"
                          sizes="(max-width: 640px) 72px 72px"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500">
                          {item.writer.nickname}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="relative w-4 h-4">
                            <Image
                              fill
                              src="/images/like.png"
                              alt="좋아요"
                              sizes="(max-width: 640px) 1rem, 1rem"
                            />
                          </div>
                          <span>{item.likeCount}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-400">
                          {format(new Date(item.createdAt), 'yyyy-MM-dd')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-12 flex items-center justify-between">
              <h2 className="h2">게시글</h2>
              <Link href="/addArticle">
                <button className="w-[88px] h-[42px] bg-blue text-white rounded-lg font-medium">
                  글쓰기
                </button>
              </Link>
            </div>
            <div className="flex justify-between items-center gap-[6px] mt-6">
              <div className="flex items-center gap-1 w-full">
                <Image
                  className="absolute ml-5"
                  width={14}
                  height={14}
                  src="/images/search.png"
                  alt="검색"
                  sizes="(max-width: 640px) 14px 14px"
                />
                <form onSubmit={getSearchResult} className="w-full">
                  <input
                    className="bg-gray-100 h-[42px] rounded-xl pt-2 pb-2 pl-11 pr-5 text-gray-500 w-full focus:outline-none"
                    placeholder="검색할 상품을 입력해주세요."
                  />
                </form>
              </div>
              <div ref={dropDownRef}>
                <button
                  onClick={handleDropdownView}
                  className="text-gray-900 w-[130px] h-[42px] border pt-3 pb-3 pl-5 pr-5 rounded-xl flex justify-between items-center"
                >
                  {orderBy === 'recent' ? '최신순' : '좋아요순'}
                  <div className="w-4 h-2 relative">
                    {!dropDownView ? (
                      <Image
                        fill
                        src="/images/dropDown.png"
                        alt="메뉴 다운"
                        sizes="(max-width: 640px) 1rem 0.5rem"
                      />
                    ) : (
                      <Image
                        fill
                        src="/images/dropUp.png"
                        alt="메뉴 업"
                        sizes="(max-width: 640px) 1rem 0.5rem"
                      />
                    )}
                  </div>
                </button>
                {dropDownView && (
                  <div className="absolute flex flex-col justify-center items-center z-10 bg-white mt-3">
                    <label
                      className="flex justify-center items-center h-11 w-[130px] border rounded-t-xl"
                      onClick={() => handleClickLabel('recent')}
                    >
                      최신순
                    </label>
                    <label
                      className="flex justify-center items-center h-11 w-[130px] border rounded-b-xl"
                      onClick={() => handleClickLabel('like')}
                    >
                      좋아요순
                    </label>
                  </div>
                )}
              </div>
            </div>
            {resultArticle.length > 0 ? (
              <div className="overflow-y-auto">
                {resultArticle?.map((item) => (
                  <div key={item.id} className="mt-6 border-b pb-6">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">
                        {item.title}
                      </span>
                      <div className="relative bg-white border border-gray-200 w-[72px] h-[72px] rounded-lg overflow-hidden">
                        <Image
                          fill
                          unoptimized
                          src={item.image ? item.image : '/images/noImage.jfif'}
                          alt={item.title}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-3">
                        <div className="relative w-6 h-6">
                          <Image
                            fill
                            src="/images/profile.png"
                            alt="프로필"
                            sizes="(max-width: 640px) 1.5rem, 1.5rem"
                          />
                        </div>
                        <span className="text-sm text-gray-500">
                          {item.writer.nickname}
                        </span>
                        <span className="text-sm text-gray-400">
                          {format(new Date(item.createdAt), 'yyyy-MM-dd')}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="relative w-4 h-4">
                          <Image
                            fill
                            src="/images/like.png"
                            alt="좋아요"
                            sizes="(max-width: 640px) 1rem, 1rem"
                          />
                        </div>
                        <span>{item.likeCount}</span>
                      </div>
                    </div>
                  </div>
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
        )}
        {isLoading && (
          <div className="fixed inset-0 bg-white flex justify-center items-center z-50">
            <div className="relative w-16 h-16 animate-spin">
              <Image
                fill
                src="/images/loading.png"
                alt="로딩 중"
                sizes="(max-width: 640px) 3rem 3rem"
              />
            </div>
          </div>
        )}
        {error && (
          <div className="flex flex-col justify-center items-center">
            <h2 className="h2 mb-2 mt-4">에러가 발생했습니다.</h2>
            <p>잠시 후 다시 시도해주세요.</p>
            <span className="mt-10 text-gray-500 text-sm">
              (Error: {error})
            </span>
          </div>
        )}
      </div>
    </>
  );
}
