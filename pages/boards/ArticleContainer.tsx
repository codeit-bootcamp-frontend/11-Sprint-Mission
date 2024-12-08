import { ReactNode } from 'react';

import { article } from '@/types';

import ArticleBox from './ArticleBox';

export default function ArticleContainer({
  children,
  articles,
}: {
  children: ReactNode;
  articles: article[];
}) {
  return (
    <section className=''>
      <div className='flex justify-between items-center'>
        <p className='text-lg font-[700]'>게시글</p>
        <button className='py-3 px-6 bg-blue-500 text-white rounded-xl font-[600]'>
          글쓰기
        </button>
      </div>
      <div className='my-4'>{children}</div>
      <div className='space-y-6'>
        {articles?.length &&
          articles.map((article) => {
            return <ArticleBox key={article.id} article={article} />;
          })}
      </div>
    </section>
  );
}
