import Image from 'next/image';
import { Article } from '@/types/article';
import { format } from 'date-fns';

export default function BoardItemList({ item }: { item: Article }) {
  return (
    <>
      <div className="mt-6 border-b pb-6">
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
    </>
  );
}
