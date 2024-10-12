import FileInput from './library/AddItem/FileInput.js';

function AddItem() {
  return (
    <div>
      <h1>상품 등록하기</h1>
      <form>
        <button>등록</button>
        <span>상품 이미지</span>
        <FileInput />
        <label for="name">상품명</label>
        <input placeholder="상품명을 입력해주세요." id="name" required />
        <label for="description">상품 소개</label>
        <textarea
          placeholder="상품 소개를 입력해주세요."
          id="description"
          required
        />
        <label for="price">판매 가격</label>
        <input placeholder="판매 가격을 입력해주세요." id="price" required />
        <label for="tag">태그</label>
        <input placeholder="태그를 입력해주세요." id="tag" required />
      </form>
    </div>
  );
}

export default AddItem;
