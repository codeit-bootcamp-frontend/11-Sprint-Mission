import Image from 'next/image';
import { Article } from '@/types/article';
import { format } from 'date-fns';

export default function BoardBestItem({ item }: { item: Article }) {
  return (
    <>
      <div className="bg-gray-50 border w-full h-[180px] rounded-xl pl-6 pr-6">
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
    </>
  );
}
