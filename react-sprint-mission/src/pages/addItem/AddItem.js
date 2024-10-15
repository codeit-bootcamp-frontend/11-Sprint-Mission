import ItemHeader from "components/ItemHeader";
import React, { useEffect, useRef, useState } from "react";
import "./AddItem.css";
import { ImgPath, ItemImage } from "components/index";
import { postAxios } from "utils/api";

function AddItem(props) {
  const [addGoodsData, setAddGoodsData] = useState({
    goodsName: "",
    goodsDetail: "",
    goodsPrice: 0,
    goodsTagArr: [],
    addItemImageURL: "",
  });
  const [goodsTag, setGoodsTag] = useState("");
  const [disabledBtn, setDisabledBtn] = useState(true);

  const handleInputChange = (inputType) => (e) => {
    const inputValue = e.target.value;
    switch (inputType) {
      case "name":
        setAddGoodsData({ ...addGoodsData, goodsName: inputValue });
        break;
      case "detail":
        setAddGoodsData({ ...addGoodsData, goodsDetail: inputValue });
        break;
      case "price": {
        if (inputValue.length < 1) return;
        let value = Number(inputValue.replaceAll(",", ""));
        if (!isNaN(value)) {
          const formatValue = value.toLocaleString("ko-KR");
          setAddGoodsData({ ...addGoodsData, goodsPrice: formatValue });
        }
        break;
      }
      default:
        setGoodsTag(inputValue);
        break;
    }
  };
  const handleKeyDown = (e) => {
    if (e.type === "keydown" && e.keyCode === 13) {
      e.preventDefault();
      setAddGoodsData({
        ...addGoodsData,
        goodsTagArr: [...addGoodsData.goodsTagArr, e.target.value],
      });
      setGoodsTag("");
    }
  };

  const handleImageChange = (value) => {
    setAddGoodsData({ ...addGoodsData, addItemImageURL: value });
  };

  const TagButton = () => {
    const handleTagBtnDelete = (btnIdx) => {
      const filterTagArr = addGoodsData.goodsTagArr.filter(
        (_, idx) => idx !== btnIdx
      );
      setAddGoodsData({
        ...addGoodsData,
        goodsTagArr: [...addGoodsData.goodsTagArr, filterTagArr],
      });
    };

    return (
      <form className="addItemContentsForm">
        {addGoodsData.goodsTagArr.map((tag, idx) => {
          return (
            <button
              id={`tagButton${idx + 1}`}
              key={`tagButton${idx + 1}`}
              className="tagButton"
              onClick={() => handleTagBtnDelete(idx)}
            >
              {`#${tag}`}
              <img
                id={`tagButtonCancel${idx + 1}`}
                src={ImgPath("/common/ic_X.png")}
                alt="cancel"
              />
            </button>
          );
        })}
      </form>
    );
  };

  const handleItamSubmit = async () => {
    console.log("postAxios");
  };
  useEffect(() => {
    if (
      addGoodsData.goodsName.length > 0 &&
      addGoodsData.goodsDetail.length > 0 &&
      addGoodsData.goodsPrice.length > 0 &&
      addGoodsData.goodsTagArr.length > 0 &&
      addGoodsData.addItemImageURL.length > 0
    ) {
      setDisabledBtn(false);
    }
  }, [addGoodsData]);
  return (
    <main>
      <ItemHeader />
      <section className="itemSection">
        <form className="addItemContentsTitle">
          <h3>상품 등록하기</h3>
          <button
            className="itemSubmit"
            type="button"
            disabled={disabledBtn}
            onClick={handleItamSubmit}
          >
            등록
          </button>
        </form>
        <form className="addItemContentsTitle">
          <h4>상품 이미지</h4>
        </form>
        <form className="addItemContentsForm">
          <ItemImage onChange={handleImageChange} />
        </form>
        <form className="addItemContentsTitle">
          <h4>상품명</h4>
        </form>
        <form className="addItemContentsForm">
          <input
            className="inputBox"
            type="text"
            placeholder="상품명을 입력해주세요"
            value={addGoodsData.goodsName}
            onChange={handleInputChange("name")}
          />
        </form>
        <form className="addItemContentsTitle">
          <h4>상품 소개</h4>
        </form>
        <form className="addItemContentsForm">
          <input
            className="inputBox"
            type="text"
            placeholder="상품 소개를 입력해주세요"
            value={addGoodsData.goodsDetail}
            onChange={handleInputChange("detail")}
          />
        </form>
        <form className="addItemContentsTitle">
          <h4>판매 가격</h4>
        </form>
        <form className="addItemContentsForm">
          <input
            className="inputBox"
            type="text"
            placeholder="판매 가격을 입력해주세요"
            value={addGoodsData.goodsPrice}
            onChange={handleInputChange("price")}
          />
        </form>
        <form className="addItemContentsTitle">
          <h4>태그</h4>
        </form>
        <form className="addItemContentsForm">
          <input
            className="inputBox"
            placeholder="태그를 입력해주세요"
            value={goodsTag}
            onChange={handleInputChange("tag")}
            onKeyDown={handleKeyDown}
          />
        </form>
        <TagButton />
      </section>
    </main>
  );
}

export default AddItem;
