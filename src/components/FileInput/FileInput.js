import { useEffect, useState } from "react";
import "./FileInput.css";
import ic_upload from "../../assets/images/ic_plus.svg";

const UPLOAD_LIMIT = 3;
const PREVIEWS_DEFAULT = [];

function FileInput({ value, onChange }) {
  const [previews, setPreviews] = useState(PREVIEWS_DEFAULT);
  const [isLimit, setIsLimit] = useState(false);

  const handleChange = (e) => {
    if (isLimit) {
      alert("상품 이미지는 최대 3개까지 업로드 할 수 있습니다.");
      return;
    }
    const { name, files } = e.target;
    onChange(name, files[0]);
  };

  const handlePreviewsClear = () => {
    setPreviews((prev) => {
      prev.forEach((src) => {
        URL.revokeObjectURL(src);
      });
      return PREVIEWS_DEFAULT;
    });
  };

  useEffect(() => {
    if (!Array.isArray(value)) return;
    if (value.length >= UPLOAD_LIMIT) setIsLimit(true);
    else setIsLimit(false);
    const nextPreviews = [];
    value.forEach((el) => {
      nextPreviews.push(URL.createObjectURL(el));
    });
    setPreviews(nextPreviews);
    return () => handlePreviewsClear;
  }, [value]);

  return (
    <fieldset>
      <label id="label-input-images">상품 이미지</label>
      <input
        name="images"
        type="file"
        id="input-images"
        onChange={handleChange}
      />
      <div className="wrap-images">
        <label htmlFor="input-images">
          <img src={ic_upload} alt="이미지 업로드" />
          <div>이미지 등록</div>
        </label>
        {previews.map((imgSrc) => {
          return (
            <div key={imgSrc} className="img-preview">
              <img src={imgSrc} alt="미리보기 이미지" />
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
