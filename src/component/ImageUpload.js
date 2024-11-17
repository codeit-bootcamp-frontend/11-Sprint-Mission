import { useRef, useState, useEffect } from "react";
import { ReactComponent as PlusIcon } from "../images/ic_plus.svg";
import DeleteButton from "./DeleteButton";

function ImageUpload({ name, value, onChange }) {
  const [preview, setPreview] = useState();
  // const [message, setMessage] = useState("");
  const inputRef = useRef(null);

  // const handleChange = (e) => {
  //   const nextValue = e.target.files[0];
  //   onChange(name, nextValue);
  // };

  // useEffect(() => {
  //   if (!value) return;

  //   const nextPreview = URL.createObjectURL(value);
  //   setPreview(nextPreview);

  //   return () => {
  //     setPreview();
  //     URL.revokeObjectURL(nextPreview);
  //   };
  // }, [value]);

  // const handleLabelClick = (e) => {
  //   if (preview) {
  //     setMessage("*이미지 등록은 최대 1개까지 가능합니다.");
  //   }
  // };

  const handleChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // 미리보기 주소 값(Object URL) 생성
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleDelete = () => {
    setPreview(""); // 미리보기 URL 리셋
  };

  return (
    <div>
      <div className="imageUploadContainer">
        <div className="customFileInput">
          <label
            htmlFor="fileUpload"
            className="uploadBox"
            // onClick={handleLabelClick}
          >
            <div className="uploadBoxContent">
              <p className="textArea">
                <PlusIcon />
                <br /> 이미지 등록
              </p>
            </div>
          </label>
          <input
            id="fileUpload"
            className="imageUploadInput"
            type="file"
            accept="image/png, image/jpeg"
            ref={inputRef}
            onChange={handleChange}
            style={{ display: "none" }}
            disabled={!!preview}
          />
        </div>

        {preview && (
          <div className="imagePreviewContainer">
            <img src={preview} alt="미리보기 이미지" className="imagePreview" />
            <DeleteButton onClick={handleDelete} label="이미지 파일" />
          </div>
        )}
      </div>
      {/* {message && <p className="errorMessage">{message}</p>} */}
    </div>
  );
}

export default ImageUpload;
