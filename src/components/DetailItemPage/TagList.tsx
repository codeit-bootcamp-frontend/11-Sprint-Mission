import React from "react";

interface TagListProps {
  tags: string[];
}

const TagList = ({ tags }: TagListProps) => {
  return (
    <div className="detailItem-tag-container">
      {tags.map((tag, productId) => (
        <div key={productId} className="detailItem-tag-box">
          #{tag}
        </div>
      ))}
    </div>
  );
};

export default TagList;
