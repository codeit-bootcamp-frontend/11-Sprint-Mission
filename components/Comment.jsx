import Image from 'next/image';
import SelectBox from '@/components/common/SelectBox';
import Profile from '@/public/ic_profile.svg';
import styles from '@/styles/Comment.module.css';

export default function Comment({ comment }) {
  const formatDate = value => {
    if (!value) return '';
    const date = new Date(value);
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
  };

  return (
    <div className={styles.commentCard}>
      <div className={styles.commentContainer}>
        <div className={styles.commentHeader}>
          <div className={styles.commentContent}>{comment?.content}</div>
          <SelectBox />
        </div>
        <div className={styles.commentWriter}>
          <Image src={comment?.writer.image || Profile} alt="프로필사진" className="profile-img" />
          <div className={styles.writerInfo}>
            <p className={styles.writerNickname}>{comment?.writer.nickname}</p>
            <p className={styles.commentUpdatedAt}>{formatDate(comment?.updatedAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
