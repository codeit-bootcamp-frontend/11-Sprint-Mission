import React, { useEffect, useRef, useState } from "react";
import { ImgPath } from ".";
import styled from "styled-components";

function ItemImage({ onChange }) {
  const inputRef = useRef();
  const [preview, setPreview] = useState(null);

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

  useEffect(() => {
    if (preview === null) {
      URL.revokeObjectURL(preview);
    }
  }, [preview]);

  return (
    <AddItemWrap>
      <label className="addItemIC" htmlFor="imgInput">
        <img src={ImgPath("/common/ic_add_image.png")} alt="addImg" />
        <AddItemInput
          id="imgInput"
          className="addItemInput"
          type="file"
          accept="image/*"
          multiple
          ref={inputRef}
          onChange={handleImageChange}
        />
      </label>
      {preview && (
        <PrevImageForm>
          <img src={preview} style={{ width: "100%" }} alt="previewImage" />
          <ClearImg
            src={ImgPath("/common/ic_X.png")}
            alt="cancel"
            onClick={handleImgClear}
          />
        </PrevImageForm>
      )}
    </AddItemWrap>
  );
}

const AddItemWrap = styled.div`
  display: flex;
  flex-direction: row;
`;
const AddItemInput = styled.input`
  display: none;
`;
const PrevImageForm = styled.div`
  width: 23%;
  display: flex;
  flex-direction: row;
  position: relative;
`;
const ClearImg = styled.img`
  position: absolute;
  top: 0;
  right: 0;
`;
export { ItemImage };
