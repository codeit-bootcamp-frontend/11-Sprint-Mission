import { useEffect, useState } from 'react';
import { getBestArticles } from '@pages/api/boardApi';
import useDimensions from '@/hooks/useDimensions';
import styles from '@styles/BestArticlesSection.module.css';
import Image from 'next/image';
import Heart from '@public/svgs/ic_heart.svg';
import Medal from '@public/svgs/ic_medal.svg';

interface ArticleList {
  id: number;
  title: string;
  content: string;
  image: string;
  likeCount: number;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
  };
}

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
  const [articles, setArticles] = useState<ArticleList[] | null>(null);
  const [pageSize, setPageSize] = useState<number | null>(null);

  const viewWidth = useDimensions();

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

  useEffect(() => {
    if (viewWidth === 0) return;

    const newPageSize = getPageSize(viewWidth);

    if (newPageSize !== pageSize) {
      setPageSize(newPageSize);

      const fetchBestArticles = async (size: number) => {
        try {
          const data = await getBestArticles(size);
          setArticles(data.list);
        } catch (error) {
          console.error('데이터를 불러오는데 실패 했습니다.', error);
        }
      };

      fetchBestArticles(newPageSize);
    }
  }, [viewWidth, pageSize]);

  return (
    <div className={styles['best-section']}>
      <div className={styles['best-title']}>베스트 게시글</div>
      {articles ? (
        <div className={styles['article-list']}>
          {articles.map((article) => (
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
        <div>데이터를 불러오는 중...</div>
      )}
    </div>
  );
}
