import React, { useEffect, useState } from "react";

function TagInput({ children, name, placeholder, setUserInput }) {
  const [value, setValue] = useState("");
  const [tags, setTags] = useState([]);
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value.trim() !== "") {
        setTags((prev) => [...prev, e.target.value]);
        setValue("");
      }
    }
  };

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const deleteTag = (index) => setTags(tags.filter((_, idx) => idx !== index));

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
