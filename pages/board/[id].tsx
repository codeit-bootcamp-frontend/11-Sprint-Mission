import { useQuery, useMutation, useQueryClient } from 'react-query';
import Image from 'next/image';
import React, { useState } from 'react';
import styles from '@styles/BoardDetailPage.module.css';
import { getArticles, getComments, addComment } from '@pages/api/boardApi';
import { ArticleList } from '@/components/types/articleTypes';
import ArticleContentSection from '@/components/boards/ArticleContentSection';
import Link from 'next/link';
import BackIcon from '@public/svgs/ic_back.svg';
import CommentList from '@/components/CommentList';
import { useRouter } from 'next/router';

interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  writer: {
    id: number;
    nickname: string;
    image?: string;
  };
}

const INITIAL_ARTICLE: ArticleList = {
  id: 0,
  title: '',
  content: '',
  image: '',
  writer: { id: 0, nickname: '' },
  createdAt: '',
  updatedAt: '',
  likeCount: 0,
};

export default function BoardsThreadPage() {
  const router = useRouter();
  const { id } = router.query as { id: string };
  const [newComment, setNewComment] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const queryClient = useQueryClient();

  const { data: article = INITIAL_ARTICLE, isLoading: isArticleLoading } =
    useQuery(['article', id], () => getArticles(id), {
      enabled: !!id,
      onError: (error) => console.error('Error fetching article:', error),
    });

  const { data: comments = [], isLoading: isCommentsLoading } = useQuery(
    ['comments', id],
    () => getComments(id),
    {
      enabled: !!id,
      onError: (error) => console.error('Error fetching comments:', error),
    },
  );

  const addCommentMutation = useMutation(
    (comment: { content: string }) => addComment(id, comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', id]);
        setNewComment('');
      },
      onError: (error) => {
        console.error('Error adding comment:', error);
        alert('댓글 등록에 실패했습니다.');
      },
    },
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    addCommentMutation.mutate({ content: newComment });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewComment(value);
    setIsFormValid(value.trim().length > 0);
  };

  if (isArticleLoading || isCommentsLoading) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div className={styles['container']}>
      <ArticleContentSection article={article} />
      <form className={styles['newcomment-section']} onSubmit={handleSubmit}>
        <label className={styles['newcomment-title']}>
          댓글 달기
          <textarea
            name="content"
            value={newComment}
            placeholder="댓글을 입력해주세요."
            onChange={handleInputChange}
            className={styles['newcomment-content']}
            rows={5}
          />
        </label>
        <button
          className={`${styles.Registerbtn} ${
            isFormValid ? styles.active : ''
          }`}
          disabled={!isFormValid}
          type="submit"
        >
          등록
        </button>
      </form>
      {comments.length > 0 ? (
        <div>
          {comments.map((comment: Comment, index: number) => (
            <CommentList comment={comment} index={index} key={comment.id} />
          ))}
        </div>
      ) : (
        <div className={styles['comment-empty']}>
          <Image
            width={140}
            height={140}
            src="/pngs/Img_reply_empty.png"
            alt="댓글 이미지"
          />
          <div className={styles['comment-empty-content']}>
            아직 댓글이 없어요,
          </div>
          <div className={styles['comment-empty-content']}>
            지금 댓글을 달아보세요!
          </div>
        </div>
      )}
      <Link href="/board" className={styles['goback']}>
        목록으로 돌아가기
        <BackIcon />
      </Link>
    </div>
  );
}
