import { useState } from "react";
import "./additems.css";

function AddItems() {
  const [preview, setPreview] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const previewFile = new FileReader();

    if (file) {
      previewFile.onload = (e) => {
        setPreview(e.target.result);
      };
      previewFile.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };
  return (
    <div className="addItemPage">
      <h2>상품 등록하기</h2>
      <form>
        <p>상품 이미지</p>
        <div className="fileArea">
          <div className="addFile">
            <label for="ex-file">이미지 선택</label>
            <input type="file" id="ex-file" onChange={handleFileChange}></input>
          </div>
          <div>
            {preview && (
              <img className="previewImg" src={preview} alt="미리보기" />
            )}
          </div>
        </div>
        <p>상품명</p>
        <input
          className="input title"
          type="text"
          placeholder="상품명을 입력해주세요"
        ></input>
        <p>상품소개</p>
        <textarea
          className="input description"
          type="text"
          placeholder="상품 소개를 입력해주세요"
        ></textarea>
        <p>판매가격</p>
        <input
          className="input price"
          type="text"
          placeholder="판매 가격을 입력해주세요"
        ></input>
        <p>태그</p>
        <input
          className="input tag"
          type="text"
          placeholder="태그를 입력해주세요"
        ></input>
      </form>
    </div>
  );
}

export default AddItems;
