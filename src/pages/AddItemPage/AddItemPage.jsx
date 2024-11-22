import { useState } from "react";
import styled from "styled-components";
import ImgUpload from "./component/ImgUpload";
import InputItem from "./component/InputItem";
import InputTag from "./component/InputTag";

const Container = styled.div`
  padding: 70px;
  @media (min-width: 1200px) {
    max-width: 1200px;
    margin: 0 auto;
  }
`;

const TitleSection = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: bold;
  color: black;
  @media (min-width: 768px) {
    font-size: 28px
  }
`;

const Btn = styled.button`
  background-color: #3692FF;
  color: white;
  padding: 11.5px 23px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #1967D6;
  }
  &:focus {
    background-color: #1251AA;
  }
  &:disabled {
    background-color: #9CA3AF;
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

function AddItemPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [tags, setTags] = useState([]);

  const addTag = (tag) => {
    if (!tags.includes(tag)) setTags([...tags, tag]);
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const isSubmitDisabled = !name || !description || !price || !tags.length;

	return (
		<Container>
			<form>
				<TitleSection>
					<Title>상품 등록하기</Title>
					<Btn type="submit" disabled={isSubmitDisabled}>
            등록
          </Btn>
				</TitleSection>

				<InputSection>
					<ImgUpload title="상품 이미지" />

          <InputItem
            id="name"
            label="상품명"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="상품명을 입력해 주세요"
          />

          <InputItem
            id="description"
            label="상품 소개"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="상품 소개를 입력해 주세요"
            isTextArea
          />

          <InputItem
            id="price"
            label="판매 가격"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="판매 가격을 입력해 주세요"
          />

          <InputTag tags={tags} onAddTag={addTag} onRemoveTag={removeTag} />
				</InputSection>
			</form>
		</Container>
	);
}

export default AddItemPage;