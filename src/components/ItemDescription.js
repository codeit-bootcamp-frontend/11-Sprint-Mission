import "./ItemDescription.css";
import OptionForm from "./OptionForm";
import Tag from "./Tag";
import Character from "../assets/images/character.svg";
import Heart from "../assets/icons/ic_heart.svg";

function ItemDescription() {
  return (
    <div className="description-container">
      <img alt="상품사진" />
      <section className="description-head">
        <div>
          <h2 />
          <OptionForm />
        </div>
        <div className="price"></div>
      </section>
      <section className="description-body">
        <div>
          <h3>상품소개</h3>
          <p />
        </div>
        <div>
          <h3>상품태그</h3>
          <Tag />
        </div>
        <div className="description-bottom">
          <div>
            <img src={Character} alt="캐릭터" />
            <p className="seller-id" />
            <p className="selling-updatedAt" />
          </div>
          <img src={Heart} alt="좋아요" />
          <button />
        </div>
      </section>
    </div>
  );
}
export default ItemDescription;
