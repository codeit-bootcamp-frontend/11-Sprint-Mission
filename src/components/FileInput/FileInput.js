import { useRef } from "react";

function FileInput({ name, value, previews, onChnage }) {
  const inputRef = useRef();

  return (
    <fieldset>
      <label htmlFor="input-image">상품 이미지</label>
      <input name="images" type="file" id="input-image" />
      <div></div>
    </fieldset>
  );
}

export default FileInput;
