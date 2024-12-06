import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import AritcleCommentThread from './AritcleCommentThread';

interface ArticleCommentSectionProps {
  articleId: number;
}

const ArticleCommentSection: React.FC<ArticleCommentSectionProps> = ({ articleId }) => {
	const [comment, setComment] = useState('');

	const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};

	return (
		<>
			<CommentInputSection>
				<Title>댓글달기</Title>

				<TextArea 
					placeholder={'댓글을 입력해 주세요.'}
					value={comment}
					onChange={handleInputChange}
				/>

				<CommentPillButton disabled={!comment.trim()}>
					등록
				</CommentPillButton>
			</CommentInputSection>

			<AritcleCommentThread articleId={articleId} />
		</>
	);
};

const CommentInputSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Title = styled.h1`
  font-size: 16px;
  font-weight: 600;
`;

const TextArea = styled.textarea`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border: none;
  border-radius: 12px;
  padding: 16px 24px;
  height: 104px;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[400]};
    font-size: 14px;
    line-height: 24px;

    @media (min-width:768px) {
      font-size: 16px;
    }
  }

  &:focus {
    outline-color: ${({ theme }) => theme.colors.blue.primary};
  }
`;


const CommentPillButton = styled.button`
	background-color: ${({ theme }) => theme.colors.blue.primary};
	color: ${({ theme }) => theme.colors.white};
	padding: 11px 23px;
	border-radius: 8px;
	font-size: 16px;
	font-weight: bold;
	cursor: pointer;
  align-self: flex-end;
  font-weight: 600;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
`;

export default ArticleCommentSection;