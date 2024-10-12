import { useEffect, useState } from "react";
import "../css/FileInput.css";
import UPLOADIMAGE from "../img/icon/upload.png";
import DELETE from "../img/icon/ic_X.png";

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

  const handleImageClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleImageDelte = () => {
    setPreview(null);
    setImgError("");
    const fileInput = document.getElementById("fileInput");
    fileInput.value = null;
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
          <img
            className="uploadImg"
            src={UPLOADIMAGE}
            alt="이미지 업로드"
            onClick={handleImageClick}
          />
          <input type="file" id="fileInput" onChange={handleChange} />
        </div>
        {preview && (
          <div className="previewContainer">
            <img className="previewImg" src={preview} alt="미리보기" />
            <img
              className="ImgDeleteIcon"
              src={DELETE}
              alt="이미지 삭제"
              onClick={handleImageDelte}
            />
          </div>
        )}
      </div>
      {imgError && <p className="ImgErrorMsg">{imgError}</p>}
    </div>
  );
}

export default FileInput;
