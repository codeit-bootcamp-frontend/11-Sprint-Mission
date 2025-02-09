import useDimensions from '@/hooks/useDimensions';
import styles from '@styles/BestArticlesSection.module.css';
import Image from 'next/image';
import Heart from '@public/svgs/ic_heart.svg';
import Medal from '@public/svgs/ic_medal.svg';
import { useBestArticles } from '@/hooks/useBestArticles';
import { ArticleList } from '../types/articleTypes';

const getPageSize = (width: number): number => {
  if (width < 768) {
    return 1; // Mobile viewport
  } else if (width < 1280) {
    return 2; // Tablet viewport
  } else {
    return 3; // Desktop viewport
  }
};

export default function BestArticlesSection() {
  const viewWidth = useDimensions();
  const pageSize = getPageSize(viewWidth);

  const { data: articles, isLoading, isError } = useBestArticles(pageSize);

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date
      .toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
      .replace(/\. /g, '. ')
      .slice(0, -1); // 공백 제거
  };

  if (isLoading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  if (isError) {
    return <div>데이터를 불러오는 중 오류가 발생했습니다.</div>;
  }

  return (
    <div className={styles['best-section']}>
      <div className={styles['best-title']}>베스트 게시글</div>
      {articles ? (
        <div className={styles['article-list']}>
          {articles.list.map((article: ArticleList) => (
            <div key={article.id} className={styles['article-item']}>
              <div className={styles['article-header']}>
                <Medal />
                Best
              </div>
              <div className={styles['article-body']}>
                <h2 className={styles['article-title']}>{article.title}</h2>
                <Image
                  width={46}
                  height={46}
                  src={`${article.image}`}
                  alt="게시글 이미지"
                  className={styles['article-image']}
                />
              </div>
              <div className={styles['article-footer']}>
                <div className={styles['article-info']}>
                  <span className={styles['article-writer']}>
                    {article.writer.nickname}
                  </span>
                  <span className={styles['article-likes']}>
                    <Heart />
                    {article.likeCount}
                  </span>
                </div>
                <span className={styles['article-updatedAt']}>
                  {formatDate(article.updatedAt)}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>게시글이 없습니다.</div>
      )}
    </div>
  );
}
