import '../style/ProductCreateForm.css';
import FileInput from './FileInput';

function ProductCreateForm() {
  return (
    <div className="ProductContainer">
      <div className="container-title">상품 등록하기</div>
      <div className="ProductImg section-title">
        상품 이미지
        <FileInput name="imgFile" />
      </div>
      <div className="ProductTitle section-title">
        상품명
        <input name="title" placeholder="상품명을 입력해주세요"></input>
      </div>
      <div className="ProductIntro section-title">
        상품소개
        <textarea
          name="content"
          placeholder="상품 소개를 입력해 주세요"
        ></textarea>
      </div>
      <div className="ProductPrice section-title">
        판매가격
        <input name="price"></input>
      </div>
      <div className="section-title">태그</div>
    </div>
  );
}

export default ProductCreateForm;
