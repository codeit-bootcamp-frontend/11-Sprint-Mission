import React, { useRef, useState } from "react";
import { ImgPath } from ".";
import styled from "styled-components";

function ItemImage({ onChange }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e) => {
    if (!e.target.files || e.target.files.length < 1) return;
    const path = URL.createObjectURL(e.target.files[0]);
    setPreview(path);
    onChange(path);
  };

  const handleImgClear = () => {
    setPreview(null);
    onChange(null);
    inputRef.current.value = "";
  };

  return (
    <>
      <img
        className="AddItemIC"
        src={ImgPath("/common/ic_add_image.png")}
        alt="addImg"
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      />
      {preview && (
        <PrevImageForm>
          <img src={preview} style={{ width: "100%" }} alt="previewImage" />
          <img
            src={ImgPath("/common/ic_X.png")}
            style={{ position: "absolute", top: 0, right: 0 }}
            alt="cancel"
            onClick={handleImgClear}
          />
        </PrevImageForm>
      )}
      <input
        ref={inputRef}
        style={{ display: "none" }}
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
    </>
  );
}

const PrevImageForm = styled.div`
  width: 23%;
  display: flex;
  flex-direction: row;
  position: relative;
`;
export { ItemImage };
