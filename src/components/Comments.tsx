import React from 'react';
import { useState } from 'react';
import SmallButton from './SmallButton';
import inquiry from '../assets/images/Img_inquiry_empty.svg';
import Comment, { CommentData } from './Comment';
import './Comments.css';

interface CommentsProps {
  commentList: CommentData[];
  initialCommentList?: CommentData[];
}

function Comments({ commentList, initialCommentList }: CommentsProps) {
  const [commentsList, setCommentsList] = useState<CommentData[]>(initialCommentList || []);

  const handleDelete = (commentId: string) => {
    const updatedList = commentsList.filter(comment => comment.id !== commentId);
    setCommentsList(updatedList);
  };

  return (
    <>
      <section className="inquiry">
        <div className="inquiry-form">
          <h3 className="inquire-to">문의하기</h3>
          <form>
            <label htmlFor="inquiry-input"></label>
            <textarea
              id="inquiry-input"
              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
              className="inquiry-content"
            />
          </form>
        </div>
        <div className="comment-submit-btn">
          <SmallButton>등록</SmallButton>
        </div>
      </section>
      <section>
        <div className="entire-comments">
          {commentList && commentList.length > 0 ? (
            commentList.map(comment => (
              <div key={comment.id}>
                <Comment comment={comment} onDelete={handleDelete} />
              </div>
            ))
          ) : (
            <div className="waiting-inquiry">
              <img src={inquiry} alt="문의를 기다리는 중입니다" className="waiting-inquiry-img" />
              <p className="waiting-inquiry-text">아직 문의가 없어요</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Comments;
