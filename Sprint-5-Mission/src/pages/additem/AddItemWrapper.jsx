import "./AddItem.css";

const AddItemWrapper = () => {
  return (
    <div className="addItem__inner">
      <div className="addItem__head">
        <h2>상품 등록하기</h2>

        <button className="addBtn">등록</button>
      </div>

      <div>
        <label htmlFor="productName">상품명</label>
        <input
          id="productName"
          type="text"
          placeholder="상품명을 입력해주세요"
        />
      </div>

      <div>
        <label htmlFor="productIntroduction">상품 소개</label>
        <textarea
          id="productIntroduction"
          placeholder="상품 소개를 입력해주세요"
        ></textarea>
      </div>

      <div>
        <label htmlFor="price">판매가격</label>
        <input id="price" type="text" placeholder="판매 가격을 입력해주세요" />
      </div>

      <div>
        <label htmlFor="tag">태그</label>
        <input id="tag" type="text" placeholder="태그를 입력해주세요" />
      </div>
    </div>
  );
};

export default AddItemWrapper;
