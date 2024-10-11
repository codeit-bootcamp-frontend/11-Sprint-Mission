import "./InputFile.scss";
import IC_PLUS from "../../assets/ic_plus.svg";
import { useRef, useState } from "react";
// import ButtonClose from "./ButtonClose";
import Button from "./Button";
import Images from "./Images";

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

  const handleClearClick = () => {
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
          <Images
            classNames="productFile-preview"
            imageSize={{
              pcSize: "large",
              tabletSize: "big-small",
              mobileSize: "big-small",
            }}
            src={preview}
            alt="이미지 프리뷰">
            <Button link={false} className="clear" onClick={handleClearClick}>
              삭제
            </Button>
          </Images>
        )}
      </div>
      {error && <p className="productFile-error">{error}</p>}
    </>
  );
}

export default InputFile;
