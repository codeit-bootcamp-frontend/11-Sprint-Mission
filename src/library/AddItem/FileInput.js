import { useEffect, useRef, useState } from 'react';

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();
  const inputRef = useRef();

  // 파일 삽입
  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  // 파일 삭제
  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = '';
    onChange(name, null);
  };

  // value 값 있을 때 URL 추출, return에서 이전에 추출한 URL 삭제
  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  // AddItem으로 전달 될 최종 값
  return (
    <div>
      <div className="fileInput">
        <div className="image">
          {preview && (
            <img className="imagePreview" src={preview} alt="이미지 미리보기" />
          )}
          {preview && (
            <button type="button" onClick={handleClearClick}>
              Ⅹ
            </button>
          )}
        </div>
        <label className="imageLabel" htmlFor="images">
          <span>+</span>
          <span>이미지 등록</span>
        </label>
        <input id="images" type="file" onChange={handleChange} ref={inputRef} />
      </div>
    </div>
  );
}

export default FileInput;
