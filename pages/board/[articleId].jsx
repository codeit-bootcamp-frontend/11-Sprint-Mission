import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from '@/pages/api/api';
import SelectBox from '@/components/common/SelectBox';
import SmallButton from '@/components/common/SmallButton';
import Comment from '@/components/Comment';
import Profile from '@/public/ic_profile.svg';
import Heart from '@/public/ic_heart.svg';
import EmptyComment from '@/public/img_empty_comment.svg';
import Back from '@/public/ic_back.svg';
import styles from '@/styles/DetailedBoard.module.css';

function formatDate(value) {
  if (!value) return '';
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

export async function getServerSideProps(context) {
  const articleId = context.params['articleId'];

  try {
    const articleResponse = await axios.get(`/articles/${articleId}`);
    const commentResponse = await axios.get(`/articles/${articleId}/comments?limit=3`);
    return {
      props: {
        articleData: articleResponse.data,
        commentData: commentResponse.data.list,
      },
    };
  } catch (error) {
    console.error('게시글 업데이트 실패:', error);
    return {
      props: {
        articleData: null,
        commentData: null,
      },
    };
  }
}

export default function Board({ articleData, commentData: initialCommentData }) {
  const [comment, setComment] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [commentData, setCommentData] = useState(initialCommentData || []);
  const invisible = { display: 'none' };

  useEffect(() => {
    setIsFormValid(comment.trim() !== '');
  }, [comment]);

  const handleCommentChange = e => {
    setComment(e.target.value);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
      },
    };
    if (comment.trim()) {
      try {
        const response = await axios.post(`/articles/${articleData.id}/comments`, { content: comment }, config);
        console.log('댓글 작성 성공:', response);

        // 댓글 작성 후 댓글 목록 다시 가져오기
        const updatedComments = await axios.get(`/articles/${articleData.id}/comments?limit=3`);
        setCommentData(updatedComments.data.list);
        setComment(''); // 댓글 작성 후 입력창 초기화
      } catch (error) {
        console.error('댓글 작성 실패:', error);
      }
    }
  };

  if (!articleData) {
    return <div>게시글을 불러올 수 없습니다.</div>;
  }

  return (
    <>
      <main className={styles.detailedBoardPage}>
        <div className={styles.detailContent}>
          <section className={styles.detailedCardContainer}>
            <div className={styles.detailedCardContent}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>{articleData?.title || '제목 없음'}</h3>
                <SelectBox />
              </div>
              <Image alt="상세이미지" width={12} height={12} src={articleData.image || '상세이미지 없음'} className="item-Image" />
              <section className={styles.userSpace}>
                <div className={styles.user}>
                  <Image width={40} height={40} src={Profile} alt="캐릭터" />
                  <div className={styles.userInfo}>
                    <p className={styles.userNickname}>{articleData?.writer.nickname || '익명'}</p>
                    <p className={styles.updatedAt}>{formatDate(articleData?.updatedAt)}</p>
                  </div>
                </div>
                <div className={styles.likeContent}>
                  <button className={styles.likeButton}>
                    <Image width={27} height={23} src={Heart} alt="좋아요" />
                    <p className={styles.likeCount}>{articleData?.likeCount || 0}</p>
                  </button>
                </div>
              </section>
            </div>
            <p className={styles.cardMainContent}>{articleData?.content || '내용 없음'}</p>
          </section>
          <section className={styles.addCommentSection}>
            <form onSubmit={handleSubmit} className={styles.addCommentSection}>
              <div className={styles.commentForm}>
                <h3 className={styles.CommentFormTitle}>댓글달기</h3>
                <label htmlFor="inquiry-input" style={invisible}></label>
                <textarea
                  id="inquiry-input"
                  placeholder="댓글을 입력해주세요."
                  value={comment}
                  onChange={handleCommentChange}
                  className={styles.addComment}
                />
              </div>
              <div className={styles.commentButton}>
                <SmallButton type="submit" disabled={!isFormValid}>
                  등록
                </SmallButton>
              </div>
            </form>
          </section>
          <section>
            <div>
              {commentData && commentData.length > 0 ? (
                commentData.map(comment => (
                  <li key={comment.id} className={styles.commentContainer}>
                    <Comment comment={comment} />
                  </li>
                ))
              ) : (
                <div className={styles.waitingComment}>
                  <Image src={EmptyComment} alt="댓글 없음" className="waiting-inquiry-img" />
                  <p className={styles.waitingCommentText}>
                    아직 댓글이 없어요.
                    <br />
                    첫번째 댓글을 달아주세요!
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
        <Link href="/boards">
          <button className={styles.returnListButton} type="button">
            <p className={styles.returnListText}>목록으로 돌아가기</p>
            <Image width={24} height={24} src={Back} alt="목록으로 돌아가기" />
          </button>
        </Link>
      </main>
    </>
  );
}
