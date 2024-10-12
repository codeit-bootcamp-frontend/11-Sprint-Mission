import { useEffect, useRef, useState } from "react";
import "./FileInput.css";
import ic_upload from "../../assets/images/ic_plus.svg";

function FileInput({ value, onChange }) {
  const [previews, setPreviews] = useState([]);
  const inputRef = useRef();

  const handleChange = (e) => {
    const { name, files } = e.target;
    onChange(name, files[0]);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreviews((prev) => {
      return [...prev, nextPreview];
    });
    return () => {
      setPreviews([]);
      URL.revokeObjectURL(value);
    };
  }, [value]);

  return (
    <fieldset>
      <label id="label-input-images">상품 이미지</label>
      <input
        name="images"
        type="file"
        id="input-images"
        ref={inputRef}
        onChange={handleChange}
      />
      <div className="wrap-images">
        <label htmlFor="input-images">
          <img src={ic_upload} alt="이미지 업로드" />
          <div>이미지 등록</div>
        </label>
        {previews.map((imgSrc, i) => {
          return (
            <div key={imgSrc} className="img-preview">
              <img src={imgSrc} alt={`미리보기 ${i}`} />
              <button type="button">
                <img src={ic_upload} alt="이미지 제거" />
                <div>삭제하기</div>
              </button>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

export default FileInput;
