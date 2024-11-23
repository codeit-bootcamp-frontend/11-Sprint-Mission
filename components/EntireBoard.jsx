import Image from 'next/image';
import heart from '@/public/ic_heart.svg';
import profile from '@/public/ic_profile.svg';
import styles from '@/styles/EntireBoard.module.css';

export default function EntireBoard({ data }) {
  const { title, image, updatedAt, likeCount, writer } = data;
  const imageUrl = image || '/default-image.jpg';

  const date = new Date(updatedAt);

  const formattedDate = date.toLocaleDateString({
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className={styles.boardListContent}>
      <div className={styles.listMainContent}>
        <div className={styles.listMainTitle}>{title}</div>
        <div className={styles.listMainContentImage}>
          <Image width={'48'} height={'44'} src={imageUrl} alt="리스트 사진" />
        </div>
      </div>
      <div className={styles.listInfo}>
        <div className={styles.listInfoAhead}>
          <div className={styles.listUserInfo}>
            <Image width={'24'} height={'24'} src={profile} alt="프로필" />
            <div className={styles.listContentInfo}>
              <div className={styles.listUserId}>{writer.nickname}</div>
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
