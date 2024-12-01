import Image from 'next/image';
import { format } from 'date-fns';

import { Article } from '@/types/article';

export default function ArticleDetail({ article }: { article: Article }) {
  return (
    <>
      <div className="border-b pb-6 border-gray-300">
        <div className="flex items-center justify-between">
          <h2 className="h2">{article.title}</h2>
          <div className="relative w-1 h-5 cursor-pointer">
            <Image
              fill
              src="/images/kebab.png"
              alt="더보기"
              sizes="(max-width: 640px) 4px, 20px"
            />
          </div>
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="relative w-10 h-10">
              <Image
                fill
                src="/images/profile.png"
                alt="프로필"
                sizes="(max-width: 640px) 40px 40px"
              />
            </div>
            <span className="text-sm text-gray-500">
              {article.writer.nickname}
            </span>
          </div>
          <span className="text-sm text-gray-400 pr-4 border-r border-gray-300 h-6 flex items-center">
            {format(new Date(article.createdAt), 'yyyy-MM-dd')}
          </span>
          <div className="flex items-center justify-center gap-1 rounded-full border px-4 h-9">
            <div className="relative w-5 h-4">
              <Image
                fill
                src="/images/like.png"
                alt="좋아요"
                sizes="(max-width: 640px) 20px, 16px"
              />
            </div>
            <span>{article.likeCount}</span>
          </div>
        </div>
      </div>
      <p className="mt-6 text-lg">{article.content}</p>
    </>
  );
}
