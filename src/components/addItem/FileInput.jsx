import { useEffect, useRef, useState } from "react";
import "./FileInput.css";

const FileInput = ({ name, value, onChange }) => {
  const [preview, setPreview] = useState();
  const [imageUploadStatus, setImageUploadStatus] = useState(false);

  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);

    // 이미지 파일이 등록되어 있는데 또 파일 선택 클릭 시
    if (preview) {
      setImageUploadStatus(true);
    }
  };

  const handleClearClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = ""; // 화면에 보여지는 파일명
    onChange(name, null);

    setImageUploadStatus(false); // 미리보기 삭제 시 하단 문구도 제거
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value); // 임시로 이미지 url 생성
    setPreview(nextPreview);

    console.log(URL.createObjectURL(value));

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]); // value 값이 변경될 때마다 미리보기 이미지 변경

  return (
    <div className="FileInput">
      <div>
        <label htmlFor="productImg">
          <input
            id="productImg"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleChange}
            ref={inputRef}
          />
          <span>이미지 등록</span>
        </label>

        {value && (
          <div className="preview">
            <img src={preview} alt="이미지 미리보기" />
            <button onClick={handleClearClick}></button>
          </div>
        )}
      </div>
      {imageUploadStatus && <p>*이미지 등록은 최대 1개까지 가능합니다.</p>}
    </div>
  );
};

export default FileInput;
