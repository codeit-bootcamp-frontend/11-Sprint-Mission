import { useEffect, useState } from 'react';
import '../style/ProductCreateForm.css';
import DeleteIcon from '@public/svgs/ic_X.svg';
import '../style/TagInput.css';

interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

function TagInput({ value, onChange }: TagInputProps) {
  const [tags, setTags] = useState<string[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    const value = e.currentTarget.value;
    if (!value.trim()) return;
    const newTags = [...tags, `#${value}`];
    setTags(newTags);
    onChange(newTags); // 태그 변경 시 부모 컴포넌트에 알림
    e.currentTarget.value = '';
  };

  const handleTagClearClick = (tagIdx: number) => {
    const newTags = tags.filter((tag, idx) => idx !== tagIdx);
    setTags(newTags);
    onChange(newTags); // 태그 삭제 시 부모 컴포넌트에 알림
  };

  return (
    <div className="ProductTag section-title">
      태그
      <input
        name="tag"
        placeholder="태그를 입력해주세요"
        onKeyDown={handleKeyDown}
      />
      <div className="tag-item-container">
        {tags.map((tag, index) => (
          <div key={index} className="tag-item">
            <div className="tag-value">{tag}</div>
            <button
              className="tag-delete-btn"
              onClick={() => handleTagClearClick(index)}
            >
              <DeleteIcon />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagInput;
