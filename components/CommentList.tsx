import React from 'react';
import Profile from '@public/svgs/ic_profile.svg';
import SortIcon from '@public/svgs/ic_kebab.svg';
import styles from '@styles/BoardDetailPage.module.css';

interface CommentListProps {
  comment: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    writer: {
      id: number;
      nickname: string;
      image?: string;
    };
  };
  index: number;
}

export default function CommentList({ comment, index }: CommentListProps) {
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
    <div className={styles['comment-container']} key={index}>
      <div className={styles['comment-header']}>
        <div className={styles['comment-content']}>{comment.content}</div>
        <SortIcon />
      </div>
      <div className={styles['comment-info']}>
        <div className={styles['comment-info-content']}>
          {comment.writer.image ? (
            <img
              className={styles['profile-icon']}
              src={comment.writer.image}
            />
          ) : (
            <Profile className={styles['profile-icon']} />
          )}
          <div className={styles['comment-user-info']}>
            <div className={styles['comment-nickname']}>
              {comment.writer.nickname}
            </div>
            <div className={styles['comment-updatedAt']}>
              {formatDate(comment.updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
