import React from 'react';
import './AddItemTag.css';

function AddItemTag({ tags, onDeleteTag }) {
  function handleDeleteTag(index) {
    onDeleteTag(index);
  }

  return (
    <div className="tags-container">
      {tags &&
        tags.map((tag, index) => (
          <div key={tag} className="tag-item">
            <p className="tag-name">{'#' + tag}</p>
            <button
              onClick={() => handleDeleteTag(index)}
              className="delete-tag-btn"
              aria-label={`태그 ${tag} 삭제`}
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
