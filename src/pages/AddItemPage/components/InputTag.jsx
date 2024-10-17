import React, { useState } from "react";
import InputField from "./InputField";
import DeleteButton from "../../../components/DeleteButton";

function InputTag({ tags, addTag, deleteTag }) {
  const [tag, setTag] = useState("");

  const pressEnter = (e) => {
    const tagText = tag.trim();
    if (e.key === "Enter" && tagText) {
      e.preventDefault();
      addTag(tagText);
      setTag("");
    }
  };
  return (
    <div>
      <InputField
        id="tags"
        label="태그"
        type="text"
        placeholder="태그를 입력해 주세요"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        onKeyDown={pressEnter}
      />
      <div className="tagSection">
        {tags.map((tag) => (
          /* 처음엔 key 값으로 map((tag,index) 형식으로 인덱스를 주려다가 인덱스 값을 주는 것은 
          좋지 않다고 했던게 기억나서 그냥 tag값 자체를 key로 줬는데 상관없을까요? 
          더 좋은 방법이 있을까요? */
          <div key={tag} className="tagItem">
            <span className="tagText">{`#${tag}`}</span>
            <DeleteButton onClick={() => deleteTag(tag)} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default InputTag;
