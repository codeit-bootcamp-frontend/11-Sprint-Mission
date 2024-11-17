import { useState } from "react";
import InputItem from "./InputItem";
import DeleteButton from "./DeleteButton";

function Tag({ tags, onAddTag, onRemoveTag }) {
  const [input, setInput] = useState("");

  // 엔터 키 누르면 tags 배열에 input 값을 추가
  const onPressEnter = (event) => {
    if (event.nativeEvent.isComposing) return;

    const inputString = input.trim();
    if (event.key === "Enter" && inputString) {
      event.preventDefault(); // 엔터 키 눌렀을 때 form이 제출되지 않도록 꼭 추가해 주세요!
      onAddTag(inputString);
      setInput(""); // 태그 추가 후 input field 초기화
    }
  };

  return (
    <div className="tagInputContainer">
      <InputItem
        id="tags"
        label="태그"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onPressEnter}
        placeholder="태그를 입력해 주세요"
      />

      {tags.length > 0 && (
        <div className="tagButtonsSection">
          {tags.map((tag) => (
            <div className="tag" key={`tag-${tag}`}>
              <span className="tagText">{tag}</span>

              <DeleteButton
                onClick={() => onRemoveTag(tag)}
                label={`${tag} 태그`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tag;
