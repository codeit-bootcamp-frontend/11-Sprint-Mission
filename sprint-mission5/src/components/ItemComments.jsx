import { useEffect, useState } from "react";
import { getDetailComments } from "../api/api";
import { getDeleteComment } from "../api/api";
import ReturnButton from "./ReturnBtn";
import myPageIcon from "../images/head/myPageIcon.png";
import styled from "styled-components";
import notFoundIcon from "../images/notFoundIcon/notFound_icon.png";
import { getUpdateComment } from "../api/api";

function ItemComments({ productId }) {
  const [comments, setComments] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editingContent, setEditingContent] = useState("");

  const handleEditClick = (comment) => {
    setEditingCommentId(comment.id);
    setEditingContent(comment.content);
  };

  const handleSaveClick = async (commentId) => {
    if (!editingContent.trim()) {
      console.error("댓글 내용이 비어 있습니다.");
      return;
    }

    try {
      const updatedComment = await getUpdateComment(
        productId,
        commentId,
        editingContent
      );
      console.log("Updated Comment:", updatedComment);
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === commentId
            ? {
                ...comment,
                content: updatedComment.content,
                updatedAt: updatedComment.updatedAt,
              }
            : comment
        )
      );
      setEditingCommentId(null);
    } catch (error) {
      console.error("댓글 수정 중 오류 발생:", error);
    }
  };

  const handleCancelClick = () => {
    setEditingCommentId(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetailComments(productId, 3);
        console.log("댓글 데이터:", data);
        setComments(data.list);
      } catch (error) {
        console.error("상품 댓글 데이터 로딩 실패:", error);
      }
    };

    fetchData();
  }, [productId]);

  const toggleDropdown = (commentId) => {
    setOpenDropdowns((prevState) => ({
      ...prevState,
      [commentId]: !prevState[commentId],
    }));
  };

  if (!comments || comments.length === 0) {
    return (
      <>
        <NotFoundWrap>
          <img src={notFoundIcon} alt="아직 문의가 없어요" />
          <p>아직 문의가 없어요</p>
        </NotFoundWrap>
        <ReturnButton />
      </>
    );
  }

  const handleDeleteComment = async (commentId) => {
    if (!commentId) {
      console.error("유효하지 않은 댓글 ID입니다.");
      return;
    }
    try {
      await getDeleteComment(productId, commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      console.log("댓글이 삭제되었습니다.");
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error.message);
    }
  };

  return (
    <CommentCon>
      {comments.map((comment) => (
        <CommentWrap key={comment.id}>
          <CommentTopBox>
            {editingCommentId === comment.id ? (
              <ModiftWrap>
                <ModiFYCommentContent
                  type="text"
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  editing={true}
                />
                <ModifyBtnWrap>
                  <CancelBtn onClick={handleCancelClick}>취소</CancelBtn>
                  <ModifyCompleteBtn
                    onClick={() => handleSaveClick(comment.id)}
                  >
                    수정 완료
                  </ModifyCompleteBtn>
                </ModifyBtnWrap>
              </ModiftWrap>
            ) : (
              <>
                <CommentContent type="text" value={comment.content} readOnly />
                <CommentDotsBox onClick={() => toggleDropdown(comment.id)}>
                  <Dots></Dots>
                  <Dots></Dots>
                  <Dots></Dots>
                </CommentDotsBox>
              </>
            )}
          </CommentTopBox>

          {comment.writer.image && (
            <CommnetWImg
              src={comment.writer.image}
              alt={comment.writer.nickname}
            />
          )}
          <CommentId>
            <img src={myPageIcon} alt="마이페이지아이콘" />
            <div>
              <CommetnNickname>{comment.writer.nickname}</CommetnNickname>
              <UpdatedAt>
                {new Date(comment.updatedAt).toLocaleString()}
              </UpdatedAt>
            </div>
          </CommentId>
          {openDropdowns[comment.id] && !editingCommentId && (
            <CommentBtnWrap>
              <ModifyBtn onClick={() => handleEditClick(comment)}>
                수정하기
              </ModifyBtn>
              <DeleteBtn onClick={() => handleDeleteComment(comment.id)}>
                삭제하기
              </DeleteBtn>
            </CommentBtnWrap>
          )}
        </CommentWrap>
      ))}
      <ReturnButton />
    </CommentCon>
  );
}
const ModiftWrap = styled.div`
  width: 100%;
`;
const ModifyBtnWrap = styled.div`
  display: flex;
  justify-content: right;
`;
const ModifyCompleteBtn = styled.button`
  padding: 12px 23px;
  background-color: var(--skyblue);
  color: var(--white);
  border-radius: 8px;
  font-size: 1rem;
`;
const CancelBtn = styled.button`
  font-size: 1rem;
  background-color: var(--gray10);
  padding: 12px 20px;
`;
const NotFoundWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 43px;
  align-items: center;
`;
const ModifyBtn = styled.button`
  font-size: 1rem;
  padding: 12px 41.5px 8px;
`;
const DeleteBtn = styled.button`
  font-size: 1rem;
  padding: 12px 41.5px 8px;
`;
const CommentCon = styled.section`
  margin-bottom: 222px;
`;
const CommentWrap = styled.div`
  border-bottom: 1px solid var(--gray200);
`;
const CommentTopBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 24px;
`;
const CommnetWImg = styled.img`
  width: 20%;
  margin-bottom: 24px;
`;
const CommentDotsBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  cursor: pointer;
`;
const Dots = styled.div`
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background-color: var(--gray400);
`;
const CommentId = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-bottom: 12px;
`;
const CommetnNickname = styled.p`
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
  color: var(--gray600);
`;
const UpdatedAt = styled.p`
  margin-bottom: 5px;
  font-size: 14px;
  color: var(--gray400);
`;
const CommentContent = styled.textarea`
  font-size: 14px;
  width: 100%;
  border: none;
  resize: none;
  font-family: "Pretendard-Regular";
  background-color: ${(props) =>
    props.editing ? "var(--gray100)" : "var(--white)"};

  &:focus {
    outline: none;
    border: none;
  }
`;
const ModiFYCommentContent = styled.textarea`
  padding-top: 16px;
  padding-left: 24px;
  font-size: 14px;
  width: 100%;
  height: 80px;
  border-radius: 12px;
  border: none;
  resize: none;
  font-family: "Pretendard-Regular";
  background-color: ${(props) =>
    props.editing ? "var(--gray100)" : "var(--white)"};

  &:focus {
    outline: none;
    border: none;
  }
`;
const CommentBtnWrap = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--bordergray);
  background-color: var(--white);
  position: absolute;
  right: 0;
  transform: translateY(-75px);
  border-radius: 8px;
`;
export default ItemComments;
