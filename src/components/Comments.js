import { useState, useEffect } from "react";
import SmallButton from "./SmallButton";
import inquiry from "../assets/images/Img_inquiry_empty.svg";
import EditMessage from "./EditMessage";
import "./Comments.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function Comment({ comment, onDelete }) {
  const [selected, setSelected] = useState("옵션");
  const [isEditing, setIsEditing] = useState(false);
  const [currentContent, setCurrentContent] = useState(comment?.content); // 현재 댓글 내용

  const handleSelect = (e) => {
    const value = e.target.value;

    setSelected(value);
    if (value === "edit") {
      setIsEditing(true); // 수정할 때
    } else if (value === "delete") {
      onDelete(comment.id); // 삭제할 때
    }
  };

  const handleCancel = () => {
    setIsEditing(false); // 수정을 취소할 때
  };

  const handleSubmit = (newContent) => {
    setCurrentContent(newContent); // 수정 내용 업뎃
    setIsEditing(false); // 완료 후 원래 창으로 전환
  };

  return (
    <div className="comment">
      <div className="comment-head">
        {!isEditing ? (
          <p className="question">{currentContent}</p>
        ) : (
          <EditMessage
            currentContent={currentContent}
            onCancel={handleCancel}
            onSubmit={handleSubmit}
          />
        )}
        <div className="form">
          {!isEditing && (
            <form>
              <label htmlFor="textOption"></label>
              <select
                id="textOption"
                onChange={handleSelect}
                value={selected}
                className="select-text"
              >
                <option value="" className="select-option">
                  옵션
                </option>
                <option value="edit" className="select-option">
                  수정하기
                </option>
                <option value="delete" className="select-option">
                  삭제하기
                </option>
              </select>
            </form>
          )}
        </div>
      </div>
      <div className="comment-bottom">
        <img
          src={comment?.writer.image}
          alt="프로필사진"
          className="profile-img"
        />
        <div className="buyer-info">
          <p className="buyer-nickname">{comment?.writer.nickname}</p>
          <p className="comment-updatedAt">{formatDate(comment?.updatedAt)}</p>
        </div>
      </div>
    </div>
  );
}

function Comments({ commentList, initialCommentList }) {
  const [commentsList, setCommentsList] = useState(initialCommentList || "");

  const handleDelete = (commentId) => {
    if (!commentsList) return;
    const updatedList = (commentsList) =>
      commentsList.filter((comment) => comment.id !== commentId);
    // console.log("updated comment list:", updatedList);
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
          <SmallButton type="submit">등록</SmallButton>
        </div>
      </section>
      <section>
        <div className="entire-comments">
          {commentList && commentList.length > 0 ? (
            commentList.map((comment) => (
              <div key={comment.id}>
                <Comment comment={comment} onDelete={handleDelete} />
              </div>
            ))
          ) : (
            <div className="waiting-inquiry">
              <img
                src={inquiry}
                alt="문의를 기다리는 중입니다"
                className="waiting-inquiry-img"
              />
              <p className="waiting-inquiry-text">아직 문의가 없어요</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Comments;
