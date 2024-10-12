import "./additems.css";
import ItemForm from "../components/ItemForm.js";

function AddItems() {
  return (
    <div className="addItemPage">
      <div className="pageTitle">
        <h2>상품 등록하기</h2>
        <button className="register">등록</button>
      </div>
      <form>
        <ItemForm />
      </form>
    </div>
  );
}

export default AddItems;
