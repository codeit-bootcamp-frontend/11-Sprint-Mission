import React, { useEffect, useState } from "react";
import styled from "styled-components";
import uploadClose from "../images/uploadImg/upload_close.png";

function TagInput({ value, onChange }) {
  const [inputValue, setInputValue] = useState("");
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      const newTag = inputValue.startsWith("#") ? inputValue : `#${inputValue}`;
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      onChange(updatedTags);
      setInputValue("");
    }
  };

  const handleTagRemove = (indexToRemove) => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
    onChange(updatedTags);
  };

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    onChange(tags);
  }, [tags, onChange]);

  return (
    <InputFlexWrap>
      <Label htmlFor="tag">태그</Label>
      <TagStyleInput
        id="tag"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="태그를 입력해주세요"
      />

      <TagPreviewWrap>
        {tags.map((tag, index) => (
          <TagItem key={index}>
            {tag}
            <TagRemoveButton onClick={() => handleTagRemove(index)}>
              <UploadClose src={uploadClose} alt="업로드 취소" />
            </TagRemoveButton>
          </TagItem>
        ))}
      </TagPreviewWrap>
    </InputFlexWrap>
  );
}

const InputFlexWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Label = styled.label`
  font-size: 1.125rem;
`;

const TagStyleInput = styled.input`
  padding-left: 24px;
  width: 100%;
  height: 56px;
  border-radius: 12px;
  border: none;
  background-color: var(--gray100);

  &::placeholder {
    color: var(--gray400);
  }
`;

const TagPreviewWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const TagItem = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: var(--gray100);
  color: var(--gray800);
  padding: 8px 16px;
  border-radius: 26px;
  font-size: 1rem;
`;

const TagRemoveButton = styled.button`
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  left: 8px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  background-color: var(--gray400);
  color: var(--white);
  border-radius: 50%;
`;
const UploadClose = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
export default TagInput;
