import React from "react";

function TagList({ tags }) {
  if (!tags || tags.length === 0) return null;

  return (
    <div>
      {tags.map((tag, index) => (
        <span key={`tag-display-${index}`} className="tag">
          #{tag}
        </span>
      ))}
    </div>
  );
}

export default TagList;
