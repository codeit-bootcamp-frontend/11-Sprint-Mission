import Image from 'next/image';
import { format } from 'date-fns';
import { Comment } from '@/types/comment';

export default function ArticleComment({ comm }: { comm: Comment }) {
  return (
    <>
      <div className="border-b mt-10 pb-8">
        <div className="flex items-end justify-between">
          <p>{comm.content}</p>
          <div className="relative w-1 h-5 cursor-pointer">
            <Image
              fill
              src="/images/kebab.png"
              alt="더보기"
              sizes="(max-width: 640px) 4px, 20px"
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 mt-6 w-full">
            <div className="relative w-8 h-8">
              <Image
                fill
                src="/images/profile.png"
                alt="프로필"
                sizes="(max-width: 640px) 32px 32px"
              />
            </div>
            <div className="flex flex-col text-sm">
              <span className="text-gray-700">{comm.writer.nickname}</span>
              <span className="text-gray-500">
                {format(new Date(comm.createdAt), 'yyyy-MM-dd')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
