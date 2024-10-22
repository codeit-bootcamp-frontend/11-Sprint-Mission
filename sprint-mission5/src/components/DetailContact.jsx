import { useState } from "react";
import styled from "styled-components";

function DetailContact({ onChange }) {
  const [texton, setTexton] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setTexton(value);
    onChange(value);
  };

  return (
    <ContactFlexWrap>
      <ContactLable htmlFor="contact">문의하기</ContactLable>
      <ContactTextarea
        id="contact"
        value={texton}
        onChange={handleChange}
        placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
      />
    </ContactFlexWrap>
  );
}

const ContactFlexWrap = styled.div`
  flex-direction: column;
  display: flex;
  gap: 9px;
`;

const ContactLable = styled.label`
  font-size: 1rem;
  font-weight: 600;
  color: var(--gray900);
`;

const ContactTextarea = styled.textarea`
  padding-top: 16px;
  padding-left: 24px;
  width: 100%;
  height: 104px;
  background-color: var(--gray100);
  border-radius: 12px;
  border: none;
  resize: none;

  &:focus {
    outline: none;
    border: none;
  }

  &::placeholder {
    font-family: "Pretendard-Regular";
    font-size: 1rem;
    font-weight: 400;
    color: var(--gray400);
    @media (min-width: 320px) and (max-width: 767px) {
      font-size: 14px;
    }
  }
`;

export default DetailContact;
