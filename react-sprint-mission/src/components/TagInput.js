import React, { useEffect, useState } from "react";
import { ImgPath } from ".";
import styled from "styled-components";

function TagInput({ children, onChange }) {
  const [inputTagValue, setInputTagValue] = useState([]);
  const [tagArr, setTagArr] = useState([]);

  const handleInputChange = (e) => {
    setInputTagValue(e.target.value);
  };

  const handleTagBtnDelete = (btnIdx) => {
    const filterTagArr = tagArr.filter((_, idx) => idx !== btnIdx);
    setTagArr(filterTagArr);
  };

  const handleKeyDown = (e) => {
    if (e.type === "keydown" && e.keyCode === 13) {
      setTagArr([...tagArr, e.target.value]);
      setInputTagValue("");
    }
  };

  useEffect(() => {
    onChange(tagArr);
  }, [onChange, tagArr]);

  return (
    <>
      <label>{children}</label>
      <input
        className="inputBox"
        placeholder="태그를 입력해주세요"
        value={inputTagValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <TagCollect>
        {tagArr.map((tag, idx) => {
          return (
            <button
              id={`tagButton${idx + 1}`}
              key={`tagButton${idx + 1}`}
              className="tagButton"
              onClick={() => handleTagBtnDelete(idx)}
            >
              {`#${tag}`}
              <img
                id={`tagButtonCancel${idx + 1}`}
                src={ImgPath("/common/ic_X.png")}
                alt="cancel"
              />
            </button>
          );
        })}
      </TagCollect>
    </>
  );
}

const TagCollect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  flex-wrap: wrap;
  height: 100%;
  margin-bottom: 32px;
  background: none;
`;

export default TagInput;
