import { useEffect, useRef, useState } from 'react';
import styles from './FileInput.module.css';

/**
 * 상품등록 > 이미지 파일 선택폼 컴포넌트
 * @param {string} name : input file 의 name
 * @param {object} value : input file 의 value
 * @param {function} onChange : 받은 콜백 함수
 * @return {JSX}
 */
function FileInput({ name, value, onChange }) {
  // 인풋 파일 요소
  const inputRef = useRef();
  // 미리보기
  const [preview, setPreview] = useState(null);

  // 파일 값 변경 처리
  const handleChange = (e) => {
    onChange(name, e.target.files[0]);
  };
  // 선택한 이미지 파일 삭제
  const handleClearClick = () => {
    const inputNode = inputRef.current;

    if (inputNode) {
      inputNode.value = '';
      onChange(name, null);
    }
  };

  useEffect(() => {
    if (!value) return;

    // 이미지 파일 미리보기 설정
    const previewImageUrl = URL.createObjectURL(value);
    setPreview(previewImageUrl);

    // 정리함수
    return () => {
      setPreview(null);
      URL.revokeObjectURL(previewImageUrl);
    };
  }, [value]);

  return (
    <div className="flex gap-6">
      <label htmlFor="images" className={styles.insteadFile}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-12"
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
            clipRule="evenodd"
          />
        </svg>
        이미지 등록
      </label>
      <input
        type="file"
        id="images"
        name="images"
        accept="image/png, image/jpeg"
        ref={inputRef}
        onChange={handleChange}
      />
      {preview && (
        <figure className={styles.wrapPreview}>
          <img src={preview} alt="상품 이미지 미리보기" />
          <button className={styles.btnClose} type="button" onClick={handleClearClick}>
            <svg
              width="22"
              height="24"
              viewBox="0 0 22 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="11" cy="12" r="10" fill="#9CA3AF" />
              <path
                d="M7.08044 8L15.0804 16"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
              <path
                d="M14.9999 8L6.99994 16"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </figure>
      )}
    </div>
  );
}

export default FileInput;
