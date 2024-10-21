import ItemHeader from "components/ItemHeader";
import React, { useState } from "react";
import "./AddItem.css";
import { TextInput, ItemImage, TagInput, Textarea } from "components/index";
import { postAxios } from "utils/api";

function AddItem(props) {
  const [itemName, setItemName] = useState("");
  const [itemDetail, setItemDetail] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [itemTagArr, setItemTagArr] = useState([]);
  const [addItemImageURL, setAddItemImageURL] = useState([]);

  const handleItemNameChange = (inputValue) => {
    setItemName(inputValue);
  };
  const handleItemDetailChange = (inputValue) => {
    setItemDetail(inputValue);
  };

  const handleItemPriceChange = (inputValue) => {
    setItemPrice(inputValue);
  };

  const handleTagChange = (tagArr) => {
    setItemTagArr(tagArr);
  };

  const handleImageChange = (value) => {
    setAddItemImageURL(value);
  };

  const handleItamSubmit = async () => {
    if (addItemImageURL.length < 1) return alert("상품 이미지를 입력해주세요.");
    if (itemName.length < 1) return alert("상품명을 입력해주세요.");
    if (itemDetail.length < 1) return alert("상품 소개를 입력해주세요.");
    if (itemPrice.length < 1) return alert("상품 가격을 입력해주세요.");
    if (itemTagArr.length < 1) return alert("상품 태그를 입력해주세요.");
    console.log("postAxios");
  };

  return (
    <main>
      <ItemHeader />
      <section className="section">
        <div className="contentsTopTitle">
          <h3>상품 등록하기</h3>
          <button
            className="itemSubmit"
            type="button"
            onClick={handleItamSubmit}
          >
            등록
          </button>
        </div>
        <div className="addItemContents column">
          <h4>상품 이미지</h4>
          <ItemImage onChange={handleImageChange} />
        </div>
        <TextInput
          id="itemNameInput"
          className="inputBox"
          type="text"
          placeholder="상품명을 입력해주세요"
          onChange={handleItemNameChange}
        >
          <h4>상품명</h4>
        </TextInput>
        <Textarea
          id="itemDetailInput"
          className="inputBox textarea"
          type="textarea"
          placeholder="상품 소개를 입력해주세요"
          onChange={handleItemDetailChange}
        >
          <h4>상품 소개</h4>
        </Textarea>
        <TextInput
          id="itemPriceInput"
          className="inputBox"
          type="number"
          placeholder="판매 가격을 입력해주세요"
          onChange={handleItemPriceChange}
        >
          <h4>판매 가격</h4>
        </TextInput>
        <TagInput onChange={handleTagChange}>
          <h4>태그</h4>
        </TagInput>
      </section>
    </main>
  );
}

export default AddItem;
