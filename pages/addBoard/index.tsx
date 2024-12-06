import styled from 'styled-components';
import { FormEvent, useState } from 'react';
import InputItem from './InputItem';
import ImgUpload from './ImgUpload';
 
const AddBoard = () => {
	const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

	const isSubmitDisabled = !title.trim() ||! !content.trim();

	return (
		<Container>
			<form>
				<TitleSection>
				<Title>게시글 쓰기</Title>
					<Button type="submit" disabled={isSubmitDisabled}>
						등록
					</Button>
				</TitleSection>

				<InputSection>
					<InputItem
						id="title"
            label="*제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해 주세요"
					/>

					<InputItem
						id="content"
            label="*내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="내용을 입력해 주세요"
            isTextArea
					/>

					<ImgUpload title="이미지" />
				</InputSection>
			</form>
		</Container>
	)
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;

  @media (min-width: 768px) {
    padding: 16px 24px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
    padding: 24px 0;
    margin: 0 auto;
  }
`;

const TitleSection = styled.div`
	display: flex;
  align-items: center;
	justify-content: space-between;
  margin-bottom: 24px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray[800]};

  @media (min-width: 768px) {
    font-size: 28px;
  }
`;

const Button = styled.button`
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

  &:disabled {
    background-color: ${({ theme }) => theme.colors.gray[400]};
    cursor: default;
    pointer-events: none;
  }
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (min-width: 768px) {
    gap: 24px;
  }
`;

export default AddBoard;