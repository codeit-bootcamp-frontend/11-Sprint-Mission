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
