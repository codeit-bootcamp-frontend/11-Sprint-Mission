import Image from 'next/image';
import medal from '@/public/icons/ic_medal.svg';
import heart from '@/public/icons/ic_heart.svg';
import styles from '@/styles/BestBoard.module.css';

interface Writer {
  nickname: string;
}

interface BestBoardData {
  title?: string;
  image?: string;
  updatedAt?: string;
  likeCount?: number;
  writer?: Writer | null;
}

interface BestBoardProps {
  data?: BestBoardData;
}

export default function BestBoard({ data = {} }: BestBoardProps) {
  if (!data) {
    return <div>게시글을 불러오는 중입니다...</div>;
  }

  const { title = '제목 없음', image = '', updatedAt = '', likeCount = 0, writer } = data || {};

  const imageUrl = image || '/default-image.jpg';

  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '날짜 없음';

  return (
    <div className={styles.cardContent}>
      <div className={styles.cardHead}>
        <Image width={'12'} height={'14'} src={medal} alt="메달" />
        <div className={styles.cardHeadTitle}>Best</div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardBodyContent}>{title}</div>
        <div className={styles.cardBodyContentImage}>
          <Image width={'48'} height={'44'} src={imageUrl} alt="게시글 사진" />
        </div>
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.cardBottomAhead}>
          <div className={styles.boardUserId}>{writer?.nickname || '익명'}</div>
          <div className={styles.likeIt}>
            <Image width={'14'} height={'12'} src={heart} alt="좋아요" />
            <div className={styles.likeCount}>{likeCount}</div>
          </div>
        </div>
        <div className={styles.bestUploadDate}>{formattedDate}</div>
      </div>
    </div>
  );
}
