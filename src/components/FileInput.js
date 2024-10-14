import { useRef } from "react";
import "./ImageUpload.css";
import "./FileInput.css";
import plus from "../assets/ic_plus.svg";
const style = { display: "none" };

function FileInput({ name, value, onChange }) {
  const inputRef = useRef();

  const handleChange = (e) => {
    const nextValue = e.target.files[0];
    onChange(name, nextValue);
  };

  const handleDeleteClick = () => {
    const inputNode = inputRef.current;
    if (!inputNode) return;

    inputNode.value = "";
    onChange(name, null);
  };

  const handleClick = () => {
    inputRef.current.click();
  };

  return (
    <>
      <div className="imageUpload" onClick={handleClick}>
        <div className="imageUploadText">
          <img src={plus} className="plus" alt="상품등록" />
          <label htmlFor="fileInput" className="input-file">
            이미지 등록
          </label>
        </div>
        {value && <button onClick={handleDeleteClick}>x</button>}
      </div>
      <div>
        <input
          type="file"
          id="fileInput"
          accept="img/jpg img/jpeg"
          onChange={handleChange}
          ref={inputRef}
          style={style}
        />
      </div>
    </>
  );
}
export default FileInput;
