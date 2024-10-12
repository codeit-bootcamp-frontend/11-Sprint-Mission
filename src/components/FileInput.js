import { useRef } from "react";
import "./ImageUpload.css";
import "./FileInput.css";
import plus from "../assets/ic_plus.svg";
const style = { display: "none" };

function FileInput({ name, onChange }) {
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);

    const files = e.currentTarget.files;
    if (![files].length <= 1) return;
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <input
        type="file"
        accept=".jpg, .jpeg"
        onChange={handleChange}
        ref={inputRef}
        style={style}
      />
      <div className="imageUpload" onClick={handleClick}>
        <div className="imageUploadText">
          <img src={plus} className="plus" alt="상품등록" />
          <p>이미지 등록</p>
        </div>
      </div>
    </>
  );
}
export default FileInput;
