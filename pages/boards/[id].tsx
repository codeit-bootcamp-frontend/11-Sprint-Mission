import { useState } from 'react';
import Link from 'next/link';
import { GetServerSidePropsContext } from 'next/types';
import axiosInstance from '@/lib/api';
import formatDate from '@/lib/formatDate';
import { Article } from '@/types/article.type';
import { Comments } from '@/types/comment.type';
//
import CommentList from '@/components/CommentList';
//
import styles from '@/styles/Article.module.css';
import BaseAvatar from '@/public/images/common/base-avatar.svg';
import IconHeart from '@/public/images/common/ico-heart.svg';
import IconBack from '@/public/images/boards/ico-back.svg';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  try {
    const { id } = context.params as { id: string };
    const [{ data: article }, { data: comments }] = await Promise.all([
      axiosInstance.get(`/articles/${id}`),
      axiosInstance.get(`/articles/${id}/comments?limit=100`),
    ]);

    return { props: { article, comments } };
  } catch {
    return { notFound: true };
  }
};

interface Props {
  article: Article;
  comments: Comments;
}

export default function Board({ article, comments }: Props) {
  const [comment, setComment] = useState('');
  const { id, title, content, updatedAt, writer, likeCount } = article;

  const disabled = comment.trim() === '';

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (comment.trim() === '') return;

    // const { data } = await axiosInstance.post(`/articles/${id}/comments`, { content: comment });
    console.log('✏️ 댓글:', id, comment);
    setComment('');

    // if (data.success) {
    //   setComment('');
    // }
  };

  return (
    <div className="container py-8">
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.meta}>
        <BaseAvatar />
        <span className={styles.name}>{writer.nickname}</span>
        <span className={styles.date}>{formatDate(updatedAt, '. ')}</span>
        <span className="v-bar"></span>
        <span className={styles.like}>
          <IconHeart className="size-8" />
          {likeCount}
        </span>
      </div>
      <p className={styles.content}>{content}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="comment" className="label">
          댓글 달기
        </label>
        <textarea
          id="comment"
          className="input"
          name="comment"
          placeholder="댓글을 입력해주세요."
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="btn self-end" disabled={disabled}>
          등록
        </button>
      </form>

      <CommentList comments={comments} />

      <div className="my-16 flex justify-center">
        <Link href="/boards" className="btn btn-rounded">
          목록으로 돌아가기
          <IconBack className="size-6" />
        </Link>
      </div>
    </div>
  );
}
