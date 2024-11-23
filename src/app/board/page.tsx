'use client';

import { useEffect } from 'react';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { format } from 'date-fns';

import { getArticles } from '@/api';
import useAsync from '@/hooks/useAsync';
import { ArticleSummary } from '@/types/articleSummary';

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
  const [article, setArticle] = useState<ArticleSummary[] | null>(null);
  const [bestArticle, setBestArticle] = useState<ArticleSummary[] | null>(null);
  const { error, isLoading, wrappedFunction } = useAsync(getArticles);

  useEffect(() => {
    const fetchData = async () => {
      const [articleResult, bestArticleResult] = await Promise.all([
        wrappedFunction(),
        wrappedFunction(`page=1&pageSize=${getBestArticles()}&orderBy=like`),
      ]);
      setArticle(articleResult?.list || []);
      setBestArticle(bestArticleResult?.list || null);
    };
    fetchData();

    window.addEventListener('resize', fetchData);

    return () => {
      window.removeEventListener('resize', fetchData);
    };
  }, [wrappedFunction]);

  return (
    <>
      <div className="mt-10 container">
        <h2 className="h2 mb-6">베스트 게시글</h2>
        <div className="flex justify-between md:gap-4 lg:gap-6">
          {bestArticle?.map((item) => (
            <div
              key={item.id}
              className="bg-gray-50 w-[384px] h-[180px] rounded-lg pl-6 pr-6"
            >
              <div className="w-[102px] h-[30px] rounded-b-2xl bg-blue text-white font-semiBold flex items-center justify-center mb-4">
                <div className="relative w-4 h-4 mr-1">
                  <Image fill src="/images/medal.png" alt="베스트" />
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
                      src={item.image ? item.image : '/images/noImage.jfif'}
                      alt={item.title}
                      objectFit="cover"
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
                        <Image fill src="/images/like.png" alt="좋아요" />
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
        <div className="overflow-y-auto">
          {article?.map((item) => <div className="mt-6">{item.title}</div>)}
        </div>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
      </div>
    </>
  );
}
