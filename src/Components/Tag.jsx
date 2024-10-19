import styles from './Tag.module.css';

/**
 * 태그 컴포넌트
 * @param {number} idx : index number
 * @param {*} children : 내부 요소
 * @param {function} onDelete : 삭제 함수
 * @return {JSX}
 */
function Tag({ idx, children, onDelete }) {
  // tag 삭제
  const handleDeleteClick = () => {
    if (onDelete) onDelete(idx);
  };

  return (
    <span className={styles.tag}>
      #{children}
      {onDelete && (
        <button type="button" title={`${children} 태그 삭제`} onClick={handleDeleteClick}>
          <svg
            width="22"
            height="24"
            viewBox="0 0 22 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="11" cy="12" r="10" fill="#9CA3AF" />
            <path
              d="M7.08032 8L15.0803 16"
              stroke="#F9FAFB"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            <path d="M15 8L7 16" stroke="#F9FAFB" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      )}
    </span>
  );
}

export default Tag;
