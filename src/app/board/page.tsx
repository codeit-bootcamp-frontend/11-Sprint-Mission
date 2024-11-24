'use client';

import { FormEvent, useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { format } from 'date-fns';
import { throttle } from 'lodash';

import { getArticles } from '@/api';
import useAsync from '@/hooks/useAsync';
import { ArticleSummary } from '@/types/articleSummary';

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
  const [article, setArticle] = useState<ArticleSummary[] | []>([]);
  const [bestArticle, setBestArticle] = useState<ArticleSummary[] | []>([]);
  const { error, isLoading, wrappedFunction } = useAsync(getArticles);

  // 초기 데이터 로드
  const fetchData = async () => {
    const [articleResult, bestArticleResult] = await Promise.all([
      wrappedFunction(),
      wrappedFunction(`page=1&pageSize=${getBestArticles()}&orderBy=like`),
    ]);
    setBestArticle(bestArticleResult?.list || null);

    if (articleResult.totalCount) {
      const pages = Math.ceil(articleResult.totalCount / PAGESIZE);
      const pageArray = Array.from({ length: pages }, (_, i) => i + 1);

      const allArticles = await Promise.all(
        pageArray.map(async (page) => {
          const articleListResult = await wrappedFunction(
            `page=${page}&pageSize=${PAGESIZE}`
          );
          return articleListResult?.list || [];
        })
      );
      setArticle(allArticles.flat());
    }
  };

  // 쓰로틀링된 fetchData 함수
  const throttledFetchData = throttle(fetchData, 500);

  const getSearchResult = (e: FormEvent<HTMLFormElement>): void => {
    const keyword = (e.target as HTMLFormElement)
      .elements[0] as HTMLInputElement;
    article?.filter((item) =>
      item.title.toUpperCase().includes(keyword.value.toUpperCase())
    );
    console.log(article);
  };

  useEffect(() => {
    throttledFetchData();

    window.addEventListener('resize', throttledFetchData);

    return () => {
      window.removeEventListener('resize', throttledFetchData);
    };
  }, [wrappedFunction]);

  return (
    <>
      <div className="mt-10 mb-24 container">
        <h2 className="h2 mb-6">베스트 게시글</h2>
        <div className="flex justify-between md:gap-4 lg:gap-6">
          {bestArticle?.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 w-[384px] h-[180px] rounded-lg pl-6 pr-6"
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
        <div className="flex items-center gap-1 mt-6">
          <Image
            className="absolute ml-5"
            width={14}
            height={14}
            src="/images/search.png"
            alt="검색"
          />
          <form onSubmit={getSearchResult}>
            <input
              className="bg-gray-100 w-[1054px] h-[42px] rounded-xl pt-2 pb-2 pl-11 pr-5 text-gray-500 focus:outline-none"
              placeholder="검색할 상품을 입력해주세요."
            />
          </form>
        </div>
        <div className="overflow-y-auto">
          {article?.map((item) => (
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
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
    </>
  );
}
