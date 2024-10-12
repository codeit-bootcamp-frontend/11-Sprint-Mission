import { useEffect, useState } from "react";
import "./FileInput.css";

function FileInput({ name, value, onChange }) {
  const [preview, setPreview] = useState();
  const [imgError, setImgError] = useState("");

  const handleChange = (e) => {
    const nextValue = e.target.files[0];

    if (preview) {
      setImgError("이미지 등록은 최대 1개까지 가능합니다");
      return;
    }
    onChange(name, nextValue);
  };

  useEffect(() => {
    if (!value) return;
    const nextPreview = URL.createObjectURL(value);
    setPreview(nextPreview);

    return () => {
      setPreview();
      URL.revokeObjectURL(nextPreview);
    };
  }, [value]);

  return (
    <div>
      <div className="fileArea">
        <div className="addFile">
          <label for="ex-file">이미지 선택</label>
          <input type="file" id="ex-file" onChange={handleChange} />
        </div>
        {preview && <img className="previewImg" src={preview} alt="미리보기" />}
      </div>
      {imgError && <p className="ImgErrorMsg">{imgError}</p>}
    </div>
  );
}

export default FileInput;
