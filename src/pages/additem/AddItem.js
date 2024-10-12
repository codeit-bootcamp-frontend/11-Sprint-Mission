import "./AddItem.css";
import Banner from "../../components/Banner/Banner";

function AddItem() {
  return (
    <div>
      <Banner />
      <main>
        <div>
          <h1>상품 등록하기</h1>
          <button>등록</button>
        </div>
        <form>
          <div>
            <label>상품이미지</label>
            <input>이미지 등록</input>
          </div>
          <div>
            <label>상품명</label>
            <input>상품명을 입력해주세요.</input>
          </div>
          <div>
            <label>상품소개</label>
            <input>상품 소개를 입력해주세요.</input>
          </div>
          <div>
            <label>판매가격</label>
            <input>판매가격을 입력해주세요.</input>
          </div>
          <div>
            <label>태그</label>
            <input>태그를 입력해주세요.</input>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AddItem;
