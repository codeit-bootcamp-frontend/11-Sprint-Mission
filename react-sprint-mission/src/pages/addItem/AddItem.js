import ItemHeader from "components/ItemHeader";
import React from "react";
import "./AddItem.css";
import { ImgPath } from "components/index";

function AddItem(props) {
  const handleAddImg = () => {
    console.log("handleAddImg");
  };
  return (
    <main>
      <ItemHeader />
      <section className="itemSection">
        <div className="addItemContentsTitle">
          <h3>상품 등록하기</h3>
          <button className="itemSubmit" type="button">
            등록
          </button>
        </div>
        <div className="addItemContentsTitle">
          <h4>상품 이미지</h4>
        </div>
        <div className="addItemContentsForm">
          <img
            className="AddItemIC"
            src={ImgPath("/common/ic_add_image.png")}
            alt="addImg"
            onClick={handleAddImg}
          />
        </div>
        <div className="addItemContentsTitle">
          <h4>상품명</h4>
        </div>
      </section>
    </main>
  );
}

export default AddItem;
