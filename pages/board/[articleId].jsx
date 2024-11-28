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

export default function Board({ articleData, initialCommentData }) {
  const [comment, setComment] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [commentData, setCommentData] = useState(initialCommentData || []);

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
      <main className="item-detail-page">
        <div className="detail-conent">
          <section className="item-detail-container">
            <div className="DetailBoardCard">
              <div className="DetailedBoardContainer">
                <div className="BoardHeader">
                  <h3 className="BoardTitle">{articleData?.title || '제목 없음'}</h3>
                  <SelectBox />
                </div>
                {articleData?.image?.[0] && <Image alt="상품사진" width={400} height={300} src={articleData.image[0]} className="item-Image" />}
                <section className="seller-space">
                  <div className="seller">
                    <Image width={40} height={40} src={Profile} alt="캐릭터" />
                    <div className="seller-info">
                      <p className="seller-nickname">{articleData?.writer.nickname || '익명'}</p>
                      <p className="selling-updatedAt">{formatDate(articleData?.updatedAt)}</p>
                    </div>
                  </div>
                  <div className="like-button">
                    <button className="button-content">
                      <Image width={27} height={23} src={Heart} alt="좋아요" />
                      <p>{articleData?.likeCount || 0}</p>
                    </button>
                  </div>
                </section>
              </div>
              <div className="BoardMainContent">{articleData?.content || '내용 없음'}</div>
            </div>
          </section>
          <section className="inquiry">
            <form onSubmit={handleSubmit}>
              <div className="inquiry-form">
                <h3 className="inquire-to">댓글달기</h3>
                <label htmlFor="inquiry-input"></label>
                <textarea
                  id="inquiry-input"
                  placeholder="댓글을 입력해주세요."
                  value={comment}
                  onChange={handleCommentChange}
                  className="inquiry-content"
                />
              </div>
              <div className="comment-submit-btn">
                <SmallButton type="submit" disabled={!isFormValid}>
                  등록
                </SmallButton>
              </div>
            </form>
          </section>
          <section>
            <div className="entire-comments">
              {commentData && commentData.length > 0 ? (
                commentData.map(comment => (
                  <li key={comment.id}>
                    <Comment comment={comment} />
                  </li>
                ))
              ) : (
                <div className="waiting-inquiry">
                  <Image src={EmptyComment} alt="아직 댓글이 없어요. 첫번째 댓글을 달아주세요!" className="waiting-inquiry-img" />
                  <div className="waiting-comment-text">아직 댓글이 없어요. 첫번째 댓글을 달아주세요!</div>
                </div>
              )}
            </div>
          </section>
        </div>
        <Link href="/boards">
          <button className="return-list-btn">
            <div className="return-list-text">목록으로 돌아가기</div>
            <Image width={24} height={24} src={Back} alt="목록으로 돌아가기" />
          </button>
        </Link>
      </main>
    </>
  );
}
