import React from "react";
import "./AddItemTag.css";

function AddItemTag({ tags, onDeleteTag }) {
  return (
    <div className="tags-container">
      {tags &&
        tags.map((tag, index) => (
          <div key={tag} className="tag-item">
            <p className="tag-name">{"#" + tag}</p>
            <button
              onClick={() => onDeleteTag(index)}
              className="delete-tag-btn"
            >
              <img
                className="x-btn"
                src="/images/icons/ic_X.svg"
                alt="태그 삭제 버튼"
              />
            </button>
          </div>
        ))}
    </div>
  );
}

export default AddItemTag;
