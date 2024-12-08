import Image from 'next/image';

import { article } from '@/types';
import { formatDate } from '@/utills';

export default function ArticleBox({ article }: { article: article }) {
  return (
    <div className='w-full h-34 space-y-4 pb-6 border-b-2'>
      <div className='flex justify-between'>
        <p className='text-lg font-[600] text-gray-800'>{article.title}</p>
        <Image
          src={article.image || '/images/no-image.png'}
          alt='게시글 이미지'
          width={72}
          height={72}
        />
      </div>

      <div className='flex justify-between'>
        <div className='flex space-x-2 text-sm items-center'>
          <Image
            src={'/images/icons/ic_my-page.svg'}
            alt=''
            width={24}
            height={24}
          />
          <p className='text-gray-600'>{article.writer.nickname}</p>
          <p className='text-gray-400'>{formatDate(article.updatedAt)}</p>
        </div>

        <div className='flex space-x-2'>
          <Image
            src={'/images/icons/ic_heart.svg'}
            alt='좋아요 이미지'
            width={24}
            height={24}
          />
          <p>{article.likeCount}</p>
        </div>
      </div>
    </div>
  );
}
