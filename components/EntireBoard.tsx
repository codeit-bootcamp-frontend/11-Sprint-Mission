import Image from 'next/image';
import heart from '@/public/ic_heart.svg';
import profile from '@/public/ic_profile.svg';
import styles from '@/styles/EntireBoard.module.css';

interface Writer {
  nickname: string;
}

interface EntireBoardData {
  title?: string;
  image?: string;
  updatedAt?: string;
  likeCount?: number;
  writer?: Writer | null;
}

interface EntireBoardProps {
  data?: EntireBoardData;
}

export default function EntireBoard({ data }: EntireBoardProps) {
  const { title = '제목 없음', image, updatedAt = '', likeCount = 0, writer } = data || {};

  const imageUrl = image || '/default-image.jpg';

  const formattedDate = updatedAt
    ? new Date(updatedAt).toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '날짜 없음';

  return (
    <div className={styles.boardListContent}>
      <div className={styles.listMainContent}>
        <div className={styles.listMainTitle}>{title}</div>
        <div className={styles.listMainContentImage}>
          <Image width={'48'} height={'44'} src={imageUrl} alt="게시글 이미지" />
        </div>
      </div>
      <div className={styles.listInfo}>
        <div className={styles.listInfoAhead}>
          <div className={styles.listUserInfo}>
            <Image width={'24'} height={'24'} src={profile} alt="프로필" />
            <div className={styles.listContentInfo}>
              <div className={styles.listUserId}>{writer?.nickname || '익명'}</div>
              <div className={styles.listUploadate}>{formattedDate}</div>
            </div>
          </div>
          <div className={styles.listLikeIt}>
            <Image width={'14'} height={'12'} src={heart} alt="좋아요" />
            <div className={styles.listLikeCount}>{likeCount}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
