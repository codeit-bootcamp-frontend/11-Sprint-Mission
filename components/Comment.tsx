import Image from 'next/image';
import React from 'react';
import profile from '@/public/profile.svg';
import Iconkebab from '@/public/ic_kebab.svg';
import styles from './Comment.module.css';

interface Writer {
  image: string;
  nickname: string;
  id: number;
}

export interface Comment {
  writer: Writer;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}

export interface CommentProps {
  comment: Comment;
}

const Comment: React.FC<CommentProps> = ({ comment }) => {
  return (
    <div className={styles.comment}>
      <div className={styles['comment-top']}>
        <div className={styles.content}>{comment.content}</div>
        <Image src={Iconkebab} alt=""></Image>
      </div>
      <div className={styles['comment-bottom']}>
        <div>
          <Image
            src={profile}
            width={24}
            height={24}
            alt="프로파일이미지"
          ></Image>
        </div>
        <div className={styles.profile}>
          <div className={styles.nickName}>{comment.writer.nickname}</div>
          <div className={styles.date}>{comment.createdAt}</div>
        </div>
      </div>
    </div>
  );
};

export default Comment;
