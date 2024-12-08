import styles from '@styles/ArticleContentSection.module.css';
import { ArticleList } from '@/components/types/articleTypes';
import Heart from '@public/svgs/ic_heart.svg';
import Profile from '@public/svgs/ic_profile.svg';

interface ArticlesSectionProps {
  article: ArticleList;
}

export default function ArticleContentSection({
  article,
}: ArticlesSectionProps) {
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

  return (
    <div className={styles['article-section']}>
      <div className={styles['article-title']}>{article.title}</div>
      <div className={styles['article-info']}>
        <div className={styles['article-userinfo']}>
          <Profile />
          <div className={styles['article-nickname']}>
            {article.writer.nickname}
          </div>
          <div className={styles['article-createdAt']}>
            {formatDate(article.createdAt)}
          </div>
        </div>
        <div className={styles['article-likecount']}>
          <Heart />
          {article.likeCount}
        </div>
      </div>
      <div className={styles['article-content']}>{article.content}</div>
    </div>
  );
}
