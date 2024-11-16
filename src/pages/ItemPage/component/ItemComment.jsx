import React, { useState } from "react";
import styled from "styled-components";
import CommentList from "./CommentList";

const CommentInputSection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;
`;

const Title = styled.h1`
	font-size: 16px;
  font-weight: 600;
`;

const TextSection = styled.textarea`
	background-color: #F3F4F6;
	border: none;
	border-radius: 12px;
	padding: 16px 24px;
	height: 104px;
	resize: none;

	&::placeholder {
		color: #9CA3AF;
		font-size: 14px;
		line-height: 24px;

		@media (min-width: 768px) {
			font-size: 16px;
		}
	}

	&:focus {
		outline-color: #3692FF;
	}
`;

const PostCommentBtn = styled.button`
  background-color: #3692FF;
  color: #FFF;
  padding: 11.5px 23px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
	align-self: flex-end;
	font-weight: 600;

  &:hover {
    background-color: #3692FF;
  }

  &:focus {
    background-color: #3692FF;
  }

  &:disabled {
    background-color: #9CA3AF;
  }

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

function ItemComment({ productId }) {
	const [comment, setComment] = useState("");

	const handleInputChange = (e) => {
		setComment(e.target.value);
	};

	return (
		<>
			<CommentInputSection>
				<Title>문의하기</Title>

				<TextSection 
					placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
					value={comment}
					onChange={handleInputChange}
				/>

				<PostCommentBtn disabled={!comment.trim()}>등록</PostCommentBtn>
			</CommentInputSection>

			<CommentList productId={productId}/>
		</>
	)
}

export default ItemComment;