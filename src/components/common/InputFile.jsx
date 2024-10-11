import "./InputFile.scss";
import IC_PLUS from "../../assets/ic_plus.svg";
import { useRef, useState } from "react";
import ButtonClose from "./ButtonClose";

function InputFile() {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const handleFileChange = () => {
    if (preview) {
      setError("*이미지 등록은 최대 1개까지 가능합니다.");
      return;
    }
    setError("");
    const file = fileInputRef.current.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);
    }
  };

  const handleDelete = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="productFile-area">
        <label htmlFor="productFile">
          <img src={IC_PLUS} alt="플러스 아이콘" className="icon-plus" />
          <div className="input-file">이미지 등록</div>
        </label>
        <input
          type="file"
          name="file"
          id="productFile"
          onChange={handleFileChange}
          ref={fileInputRef}
        />
        {preview && (
          <div className="productFile-preview">
            <img src={preview} alt="이미지 프리뷰" />
            <ButtonClose onClick={handleDelete} />
          </div>
        )}
      </div>
      {error && <p className="productFile-error">{error}</p>}
    </>
  );
}

export default InputFile;
