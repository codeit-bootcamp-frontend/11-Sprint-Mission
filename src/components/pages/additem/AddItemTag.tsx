import './AddItemTag.css';

interface AddItemTagProps {
  tags: string[];
  onDeleteTag?: (index: number) => void;
}

function AddItemTag({ tags, onDeleteTag }: AddItemTagProps) {
  function handleDeleteTag(index: number) {
    if (onDeleteTag) {
      onDeleteTag(index);
    }
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
              {onDeleteTag && (
                <img
                  className="x-btn"
                  src="/images/icons/ic_X.svg"
                  alt="태그 삭제 버튼"
                />
              )}
            </button>
          </div>
        ))}
    </div>
  );
}

export default AddItemTag;
