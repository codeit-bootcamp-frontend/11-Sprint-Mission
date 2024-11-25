import Image from 'next/image';
import medal from '@/public/ic_medal.svg';
import heart from '@/public/ic_heart.svg';
import styles from '@/styles/BestBoard.module.css';

export default function BestBoard({ data = {} }) {
  const { title, image, updatedAt, likeCount, writer } = data;

  const date = new Date(updatedAt);

  const formattedDate = date.toLocaleDateString({
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.cardContent}>
      <div className={styles.cardHead}>
        <Image width={'12'} height={'14'} src={medal} alt="메달" />
        <div className={styles.cardHeadTitle}>Best</div>
      </div>
      <div className={styles.cardBody}>
        <div className={styles.cardBodyContent}>{title}</div>
        <div className={styles.cardBodyContentImage}>
          <Image width={'48'} height={'44'} src={image} alt="게시글 사진" />
        </div>
      </div>
      <div className={styles.cardBottom}>
        <div className={styles.cardBottomAhead}>
          <div className={styles.boardUserId}>{writer.nickname}</div>
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
