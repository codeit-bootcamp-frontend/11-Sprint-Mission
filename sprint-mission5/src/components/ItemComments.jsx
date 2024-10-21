import { useEffect, useState } from "react";
import { getDetailComments } from "../api/api";
import { useNavigate } from "react-router-dom";

import myPageIcon from "../images/head/myPageIcon.png";
import styled from "styled-components";
import returnIcon from "../images/returnicon/return.png";

function ItemComments({ productId }) {
  const [comments, setComments] = useState(null);
  const [openDropdowns, setOpenDropdowns] = useState({});
  const navigate = useNavigate();
  const handleReturnClick = () => {
    navigate(-1);
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
    return <div>댓글이 없습니다.</div>;
  }

  return (
    <CommentCon>
      {comments.map((comment) => (
        <CommentWrap key={comment.id}>
          <CommentTopBox>
            <CommentContent>{comment.content}</CommentContent>
            <CommentDotsBox onClick={() => toggleDropdown(comment.id)}>
              <Dots></Dots>
              <Dots></Dots>
              <Dots></Dots>
            </CommentDotsBox>
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
          {openDropdowns[comment.id] && (
            <CommentBtnWrap>
              <ModifyBtn>수정하기</ModifyBtn>
              <DeleteBtn>삭제하기</DeleteBtn>
            </CommentBtnWrap>
          )}
        </CommentWrap>
      ))}
      <ReturnBtn onClick={handleReturnClick}>
        <ReturnTxt>목록으로 돌아가기</ReturnTxt>
        <img src={returnIcon} alt="돌아가기 btn" />
      </ReturnBtn>
    </CommentCon>
  );
}
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
  width: 100%;
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
const CommentContent = styled.p`
  font-size: 14px;
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
const ReturnTxt = styled.span`
  font-size: 1.125rem;
  color: var(--white);
`;
const ReturnBtn = styled.button`
  margin: 0 auto;
  margin-top: 64px;
  padding: 11px 39.5px;
  background-color: var(--skyblue);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 40px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: var(--gray900);

    ${ReturnTxt} {
      color: var(--bgkakao);
    }
  }
`;
export default ItemComments;
