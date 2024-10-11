import React, { useEffect, useState } from "react";

function TagInput({ children, name, placeholder, setUserInput }) {
  const [value, setValue] = useState(""); // input state
  const [tags, setTags] = useState([]); // 화면 노출 및 form의 tags를 위한 state

  /**
   * 엔터를 입력 받으면 태그 추가 - 공백, 중복 추가 불가
   * @param {*} e keydownEvent
   */
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const isValidAddTag =
        e.target.value.trim() !== "" && tags.indexOf(e.target.value); // 공백 & 중복 태그 확인
      if (isValidAddTag) {
        setTags((prev) => [...prev, e.target.value]);
        setValue("");
      }
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  /**
   * x버튼 클릭 시 태그 삭제
   * @param {*} index 태그 삭제를 위한 인덱싱 변수
   * @returns
   */
  const deleteTag = (index) => setTags(tags.filter((_, idx) => idx !== index));

  /**
   * tag state가 변할 때(추가, 삭제) form의 tags 업데이트
   */
  useEffect(() => {
    setUserInput((prev) => ({
      ...prev,
      tags: tags,
    }));
  }, [tags, setUserInput]);

  return (
    <div className="form-input-wrap">
      <label htmlFor={`item_${name}`}>{children}</label>
      <input
        id={`item_${name}`}
        type="text"
        placeholder={placeholder}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={handleInput}
      />
      <div className="tag-area">
        {tags.map((tag, idx) => (
          <div key={`tag_${idx}`} className="tag">
            <span>#{tag}</span>
            <button
              type="button"
              className="btn-delete-tag"
              onClick={() => deleteTag(idx)}
            >
              <span className="sr-only">삭제</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagInput;
