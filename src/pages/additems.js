import "./additems.css";

function AddItems() {
  return (
    <div className="addItemPage">
      <h2>상품 등록하기</h2>
      <form>
        <p>상품 이미지</p>
        <input type="file"></input>
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
