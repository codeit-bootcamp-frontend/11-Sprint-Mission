import axiosInstance from '@/lib/axiosInstance';
import { useRouter } from 'next/router';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import Profile from '@public/svgs/ic_profile.svg';
import SortIcon from '@public/svgs/ic_kebab.svg';
import styles from '@styles/BoardDetailPage.module.css';
import { getArticles } from '@pages/api/boardApi';
import { ArticleList } from '@/components/types/articleTypes';
import ArticleContentSection from '@/components/boards/ArticleContentSection';
import Link from 'next/link';
import BackIcon from '@public/svgs/ic_back.svg';

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

interface ArticlesSectionProps {
  initialArticle: ArticleList;
}

const INITIAL_ARTICLE = {
  id: 0,
  title: '',
  content: '',
  image: '',
  writer: { id: 0, nickname: '' },
  createdAt: '',
  updatedAt: '',
  likeCount: 0,
};

export default function BoardsThreadPage({
  initialArticle = INITIAL_ARTICLE,
}: ArticlesSectionProps) {
  const router = useRouter();
  const { id } = router.query;
  const [comments, setComments] = useState<Comment[]>([]);
  const [article, setArticle] = useState<ArticleList>(initialArticle);
  const [newComment, setNewComment] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (!router.isReady) return;

    const fetchComments = async () => {
      try {
        const response = await axiosInstance.get(`/articles/${id}/comments`, {
          params: {
            limit: 10,
          },
        });
        setComments(response.data.list);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    const fetchArticle = async () => {
      try {
        const data = await getArticles(id);
        if (!data) {
          throw new Error('해당 게시글의 데이터를 찾을 수 없습니다.');
        }
        setArticle(data);
      } catch (error) {
        console.error('데이터를 불러오는데 실패 했습니다.', error);
      }
    };

    fetchComments();
    fetchArticle();
  }, [router.isReady]);

  useEffect(() => {
    newComment ? setIsFormValid(true) : setIsFormValid(false);
  }, [newComment]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      alert('로그인이 필요합니다.');
      return;
    }

    const data = {
      content: newComment, // newComment를 직접 사용
    };

    try {
      const response = await axiosInstance.post(
        `/articles/${id}/comments`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('댓글 등록 성공:', response.data);
      alert('댓글이 등록되었습니다.');
      setNewComment(''); // 댓글 입력 필드 초기화
    } catch (error) {
      console.error('댓글 등록 실패:', error);
      alert('댓글 등록에 실패했습니다.');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment(e.target.value);
  };

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
          {comments.map((comment, index) => (
            <div className={styles['comment-container']} key={index}>
              <div className={styles['comment-header']}>
                <div className={styles['comment-content']}>
                  {comment.content}
                </div>
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
