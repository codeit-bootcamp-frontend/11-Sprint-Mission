import { useState, ReactNode, Dispatch, KeyboardEvent } from "react";
import { InputAction } from "pages/AddItem";

interface Props {
  name: string;
  tags: string[];
  placeholder: string;
  dispatch: Dispatch<InputAction>;
  children: ReactNode;
}

function TagInput({ children, name, tags, placeholder, dispatch }: Props) {
  const [value, setValue] = useState(""); // input state

  /**
   * 엔터를 입력 받으면 태그 추가 - 공백, 중복 추가 불가
   * @param {*} e keydownEvent
   */
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const target = e.target as HTMLInputElement;
      const trimmedValue = target.value.trim();
      const isValidAddTag = trimmedValue !== "" && !tags.includes(trimmedValue); // 공백 & 중복 태그 확인
      if (isValidAddTag) {
        dispatch({ type: "SET_TAGS", payload: [...tags, trimmedValue] });
        setValue("");
      }
    }
  };

  /**
   * x버튼 클릭 시 태그 삭제
   * @param {*} index 태그 삭제를 위한 인덱싱 변수
   * @returns
   */
  const deleteTag = (index: number) =>
    dispatch({
      type: "SET_TAGS",
      payload: tags.filter((_, idx) => idx !== index),
    });

  return (
    <div className='form-input-wrap'>
      <label htmlFor={`item_${name}`}>{children}</label>
      <input
        id={`item_${name}`}
        type='text'
        placeholder={placeholder}
        value={value}
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className='tag-area'>
        {tags.map((tag, idx) => (
          <div key={`tag_${idx}`} className='tag'>
            <span>#{tag}</span>
            <button
              type='button'
              className='btn-delete-tag'
              onClick={() => deleteTag(idx)}
            >
              <span className='sr-only'>삭제</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagInput;
